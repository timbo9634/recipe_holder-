# Recipe App

Next.js 14 App Router + Tailwind CSS + shadcn/ui-style components.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: leave default.

## Current scope

- Home page: recipe photo card wall + search.
- Add recipe page: source recipe text, personal notes, tags, photo upload preview.
- Mock data only.

## Next steps

- Add Prisma + Postgres.
- Add image storage via Cloudflare R2 or S3.
- Add `/api/recipes` route.
- Add full-text search / Meilisearch / Typesense.
- Optionally use LLM to parse pasted recipe text into ingredients, steps, time and tags.
