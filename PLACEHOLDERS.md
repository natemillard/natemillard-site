# Placeholder inventory

Everything on this list is invented content, written so the design could be
judged with realistic text in place. None of it is true. Work down the list and
delete this file when it is empty.

Content files carry a `⚠ EXAMPLE CONTENT` comment at the top of their
frontmatter, and their body text contains visible `[EXAMPLE]` markers. Page
files carry a `⚠ PLACEHOLDER COPY` note in the comment block at the top.

## Needs your words

| File | What to replace |
|---|---|
| `src/config.ts` | Tagline, description, social profile URLs |
| `src/pages/index.astro` | The opening statement and the three intro paragraphs |
| `src/pages/about.astro` | Every paragraph, plus the three facts in the sidebar |
| `src/data/cv.ts` | Entire CV — summary, experience, education, teaching, service, awards, skills |

## Example content files — replace or delete

| File |
|---|
| `src/content/writing/what-preparedness-asks-of-people.md` |
| `src/content/writing/social-ties-and-evacuation.md` |
| `src/content/writing/teaching-disaster-without-teaching-fear.md` |
| `src/content/writing/notes-from-a-cooling-center.md` |
| `src/content/projects/household-recovery-study.md` |
| `src/content/projects/neighborhood-preparedness-networks.md` |
| `src/content/projects/shelter-volunteer-onboarding.md` |
| `src/content/trainings/first-72-hours.mdx` (now `draft: true` — develop or delete) |

`src/content/trainings/asset-mapping.mdx` is **not** placeholder content. It is
a real prototype module, de-branded and framed as a personal adaptation. Review
its `affiliationNote` before the site goes public.

Keep the `_TEMPLATE` files — they are the starting point for new content.

## Assets that do not exist yet

| Path | What it is |
|---|---|
| `public/downloads/cv.pdf` | Your CV, linked from the header of `/cv` and the About sidebar |
| `public/images/portrait.jpg` | Portrait for the About page (currently an empty slot) |
| `public/images/projects/*` | Project images (cards currently show an empty slot) |

## Settings to check before launch

- `astro.config.mjs` → `site:` must be your real domain, or the sitemap and RSS
  feed will contain wrong URLs.
