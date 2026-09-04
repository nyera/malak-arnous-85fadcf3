import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { sendTemplateEmail } from '@/lib/email-templates/send-email'

const payloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  country: z.string().trim().max(200).optional().default(''),
  age: z.string().trim().max(50).optional().default(''),
  answers: z.string().trim().min(1).max(50000),
})

// Very small in-memory throttle to blunt obvious abuse.
const recent = new Map<string, number>()
const WINDOW_MS = 30_000

export const Route = createFileRoute('/api/public/survey')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed
        try {
          parsed = payloadSchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'invalid_payload' }, { status: 400 })
        }

        const ip =
          request.headers.get('cf-connecting-ip') ||
          request.headers.get('x-forwarded-for') ||
          'unknown'
        const now = Date.now()
        const last = recent.get(ip)
        if (last && now - last < WINDOW_MS) {
          return Response.json({ error: 'too_many_requests' }, { status: 429 })
        }
        recent.set(ip, now)
        if (recent.size > 500) {
          for (const [key, at] of recent) if (now - at > WINDOW_MS) recent.delete(key)
        }

        const submissionId = crypto.randomUUID()

        try {
          await sendTemplateEmail('survey-notification', 'hello@malakarnoushealing369.com', {
            templateData: parsed,
            idempotencyKey: `survey-notification-${submissionId}`,
            replyTo: parsed.email,
          })
        } catch (error) {
          console.error('survey notification send failed', error)
          return Response.json({ error: 'send_failed' }, { status: 502 })
        }

        try {
          await sendTemplateEmail('survey-confirmation', parsed.email, {
            templateData: { name: parsed.name },
            idempotencyKey: `survey-confirmation-${submissionId}`,
            replyTo: 'hello@malakarnoushealing369.com',
          })
        } catch (error) {
          console.error('survey confirmation send failed', error)
        }

        return Response.json({ ok: true })
      },
    },
  },
})
