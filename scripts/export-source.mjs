import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const outputDir = path.join(root, 'public');
const outputFile = path.join(outputDir, 'TravelMateNE-source.zip');
const excluded = new Set(['node_modules', '.git', 'dist', '.render', '.next']);
const excludedFiles = new Set(['.env', '.env.local', '.env.production', 'TravelMateNE-source.zip']);

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}
function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}
async function walk(dir, relative = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (excluded.has(entry.name) || excludedFiles.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    const rel = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) result.push(...await walk(absolute, rel));
    else if (entry.isFile()) result.push({ absolute, name: rel });
  }
  return result;
}
function makeZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const stamp = dosDateTime(new Date());
  for (const file of files) {
    const name = Buffer.from(file.name.replaceAll(path.sep, '/'), 'utf8');
    const raw = file.data;
    const compressed = zlib.deflateRawSync(raw, { level: 9 });
    const crc = crc32(raw);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(stamp.time, 10);
    local.writeUInt16LE(stamp.date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(0x0314, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(stamp.time, 12);
    central.writeUInt16LE(stamp.date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + compressed.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

await fs.mkdir(outputDir, { recursive: true });
const paths = await walk(root);
const files = await Promise.all(paths.map(async item => ({
  name: item.name,
  data: await fs.readFile(item.absolute)
})));
if (!files.length) throw new Error('No project source files were found.');
const archive = makeZip(files);
await fs.writeFile(outputFile, archive);
console.log(`Created ${path.relative(root, outputFile)} with ${files.length} project files (${archive.length} bytes).`);
