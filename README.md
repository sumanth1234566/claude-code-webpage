# GoFIBER marketing website

Lead-generation website for GoFIBER business internet, VoIP and number services in Southern California.
Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Configuration

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
|---|---|
| `LEAD_NOTIFY_EMAIL` | Inbox that receives new leads |
| `LEAD_WEBHOOK_URL` | Optional webhook that receives each lead as JSON |
| `RESEND_API_KEY` | Email provider key (resend.com) for lead emails and customer auto-replies |
| `EMAIL_FROM` | Sender address (domain must be verified in Resend) |
| `NEXT_PUBLIC_SITE_URL` | Final site URL, once the domain is decided |
| `NEXT_PUBLIC_NOINDEX` | `true` hides the site from search engines (use for previews) |

With no email key or webhook set, leads are only written to the server log.

## Where things live

- `content/site.ts`: company facts and contact details (the single source of facts)
- `content/products.ts`: product page content and FAQs
- `app/`: pages, plus `app/api/lead/route.ts` for form submissions
- `components/`: shared UI (header, footer, forms, scroll video and more)
- `lib/deliver.ts`: lead delivery by email and webhook
- `public/media/`: video, poster and illustrations

## Still to do before launch

- Real HQ street address, the webhook URL and a Resend API key
- Privacy Policy and Terms content (pages are placeholders)
- Coverage map data
- Final domain and hosting
