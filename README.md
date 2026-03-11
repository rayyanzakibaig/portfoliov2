# Rayyan Zakibaig — Portfolio

Personal portfolio for Rayyan Zakibaig, product designer and builder.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion**
- **TypeScript**

## Structure

```
app/
  page.tsx           # Home — hero, highlights, work
  about/page.tsx     # About — bio, experience, skills
  creative/page.tsx  # Creative work — indexed list
  work/[slug]/       # Case study pages
components/
  Nav.tsx            # Frosted glass nav with sliding pill
  Cursor.tsx         # Custom cursor — dot + lagging ring
  ProjectCard.tsx    # Work case study cards
  Modal.tsx          # Creative work modal
  Footer.tsx         # Footer with click-to-copy email
  Tag.tsx            # Skill pill tags
  ThemeProvider.tsx  # Light/dark mode (follows system)
data/
  projects.ts        # Case study content
  creative.ts        # Creative work content
lib/
  motion.ts          # Framer Motion variants
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
