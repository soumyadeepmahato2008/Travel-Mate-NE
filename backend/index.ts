import { router, json, requireAuth, requireRole, db } from '@appdeploy/sdk';

const textValue = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export const handler = router({
  'GET /api/health': [
    async () => json({ ok: true, service: 'TravelMateNE' }),
  ],

  'GET /api/trips': [
    requireAuth(),
    async (ctx) => {
      const result = await db.list('travelmate_trips', {
        filter: { userId: ctx.user!.userId },
        limit: 50,
      });
      return json({ items: result.items });
    },
  ],

  'POST /api/trips': [
    requireAuth(),
    async (ctx) => {
      const body = (ctx.body || {}) as {
        name?: string;
        destination?: string;
        itinerary?: unknown;
      };

      if (!textValue(body.name, 100) || !body.itinerary) {
        return json({ error: 'Trip name and itinerary are required.' }, 400);
      }

      const [id] = await db.add('travelmate_trips', [{
        userId: ctx.user!.userId,
        name: textValue(body.name, 100),
        destination: textValue(body.destination, 180),
        itinerary: body.itinerary,
        createdAt: new Date().toISOString(),
      }]);

      return id
        ? json({ id, saved: true }, 201)
        : json({ error: 'Could not save the trip.' }, 500);
    },
  ],

  'DELETE /api/trips/:id': [
    requireAuth(),
    async (ctx) => {
      const [trip] = await db.get<{ userId: string }>('travelmate_trips', [ctx.params.id]);

      if (!trip || trip.userId !== ctx.user!.userId) {
        return json({ error: 'Trip not found.' }, 404);
      }

      const [deleted] = await db.delete('travelmate_trips', [ctx.params.id]);
      return json({ deleted: Boolean(deleted) });
    },
  ],

  'POST /api/enquiries': [
    async (ctx) => {
      const body = (ctx.body || {}) as Record<string, unknown>;
      const name = textValue(body.name, 100);
      const email = textValue(body.email, 160);
      const destination = textValue(body.destination, 180);

      if (!name || !email.includes('@') || !destination) {
        return json({ error: 'Name, valid email and destination are required.' }, 400);
      }

      const [id] = await db.add('travelmate_enquiries', [{
        name,
        email,
        destination,
        dates: textValue(body.dates, 80),
        guests: Math.max(1, Math.min(30, Number(body.guests) || 1)),
        message: textValue(body.message, 1200),
        type: 'tour and stay enquiry',
        status: 'new',
        createdAt: new Date().toISOString(),
      }]);
    },
  ],
});