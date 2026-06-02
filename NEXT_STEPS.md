# Recipe Memory Palace - NEXT STEPS

## Vision

This is a personal recipe memory app.

Core value:

- Finished dish photos
- My personal modifications
- Fast search
- Original copied recipe text

This is not:

- A public recipe website
- A social app
- An AI recipe generator
- A paid LLM/API project

## Current Version: V1

Done:

- Next.js 14 App Router project
- Tailwind CSS
- shadcn-style UI components
- Homepage with recipe card wall
- Create recipe page
- Mock recipe data
- GitHub repo connected
- Vercel deployment working

## Current Goal: V1.1

Upgrade from static mock data to a usable localStorage-based app.

Requirements:

1. Store recipes in localStorage.
2. Seed localStorage from mockRecipes only if no saved recipes exist.
3. Homepage should read recipes from localStorage.
4. Search across:
   - title
   - sourceText
   - myNotes
   - tags
5. Create recipe page should save new recipes into localStorage.
6. Add recipe detail page:
   - /recipes/[id]
7. Detail page should show:
   - hero image
   - title
   - tags
   - myNotes as the highlighted main section
   - sourceText in a collapsible section
   - edit button
8. Add edit page:
   - /recipes/[id]/edit
9. Edit page should:
   - prefill existing recipe data
   - update recipe
   - delete recipe
10. For uploaded images, use base64 data URLs for now.
11. Do not add a database yet.
12. Do not add Prisma yet.
13. Do not add Supabase, Neon, Firebase, Cloudflare R2, or Vercel Blob yet.
14. Do not use any LLM API.
15. Do not use OpenAI API, Claude API, Gemini API, or any paid AI service.
16. Keep changes minimal.
17. Reuse existing components where possible.
18. Keep the current UI style.

## Future V1.2

Possible features:

- Tag filters
- Sort by newest
- Better empty state
- Timeline view by month
- Better image gallery
- Export/import localStorage backup

## Future V2

Only consider this after the app has 50+ recipes.

Possible features:

- PostgreSQL
- Full-text search
- Proper image storage
- Authentication