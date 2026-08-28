# nathanielmillard-site

The source for my personal professional website: a homepage, an about page, a
portfolio of work, a Training Lab, a writing archive, an online CV, and a
contact form.

This README is written for me, not for a professional web developer. It assumes
you can open a terminal and type commands, and nothing beyond that.

---

## What this is built with

| Thing | What it does | Why it's here |
|---|---|---|
| **[Astro](https://astro.build)** | Turns the files in `src/` into plain HTML | It ships almost no JavaScript, which makes the site fast and simple |
| **Markdown / MDX** | The format your content is written in | Plain text with a bit of structure at the top. Readable in any editor |
| **TypeScript** | Used in a handful of config and helper files | Catches typos before they become broken pages |
| **Netlify** | Hosts the finished site and handles the contact form | Free tier, automatic deploys from GitHub |
| **GitHub** | Stores the source and triggers deploys | Every change is saved and reversible |

There is **no** React, no database, no server, no CMS. The whole site is a
folder of HTML files that Netlify serves. That's deliberate: fewer moving parts
means fewer things that can break while you aren't looking.

Four dependencies, total: `astro`, `@astrojs/mdx`, `@astrojs/sitemap`,
`@astrojs/rss`, plus one self-hosted font package.

---

## Running it on your computer

You need [Node.js](https://nodejs.org) version 20 or newer. Check with
`node -v`. If that errors, install Node first.

```bash
cd ~/Sites/nathanielmillard-site

npm install     # once, and again whenever dependencies change
npm run dev     # start the local site
```

`npm run dev` prints a web address, usually `http://localhost:4321`. Open it in
a browser. Edit a file, save, and the browser updates by itself. Press
`Ctrl + C` in the terminal to stop.

Two other commands worth knowing:

```bash
npm run build     # build the real site into dist/ — catches errors Netlify would hit
npm run preview   # look at the built site exactly as Netlify will serve it
```

**Run `npm run build` before pushing.** If it succeeds locally it will almost
certainly succeed on Netlify. If it fails, the error message names the file.

---

## How content works

Content lives in `src/content/`, in three folders:

```
src/content/
  writing/     essays, research, publications, talks, reflections  (.md)
  projects/    portfolio entries                                   (.md)
  trainings/   Training Lab modules                                (.mdx)
```

Each file is a plain text file with two parts: a block of settings at the top
between `---` lines (called **frontmatter**), and the actual content below it.

```markdown
---
title: 'The title of the thing'
date: 2026-04-18
summary: 'One or two sentences.'
---

The content, written in Markdown.
```

**The rules for what each folder's frontmatter may contain live in
`src/content.config.ts`.** That file is heavily commented and is the honest
answer to "what fields can I use here?" If you type a field name wrong or miss
a required one, `npm run build` fails and tells you exactly which file and which
field — which is the system working, not breaking.

Every folder has a `_TEMPLATE` file. Files starting with an underscore are
ignored by the build, so templates never become pages. **Copy the template
rather than starting from scratch** — it lists every available field with a
comment explaining it.

### Adding an essay

```bash
cp src/content/writing/_TEMPLATE.md src/content/writing/my-new-essay.md
```

Open it, fill in the frontmatter, write the piece below it, and set
`draft: false` when you're ready. The filename becomes the URL:
`my-new-essay.md` → `/writing/my-new-essay`. Use lowercase words separated by
hyphens, and don't rename a file after people have linked to it.

Required: `title`, `date`, `type`, `summary`.
`type` is one of `essay`, `research`, `publication`, `talk`, `reflection`.

If a piece was published somewhere else, set `externalUrl` and the listing will
link straight out to it.

### Adding a project

```bash
cp src/content/projects/_TEMPLATE.md src/content/projects/my-project.md
```

Required: `title`, `summary`, `role`, `startDate`.
Optional but useful: `outcomes`, `collaborators`, `links`, `downloads`,
`gallery`, and `order` (lower numbers sort first on `/work`).

### Adding a training

```bash
cp src/content/trainings/_TEMPLATE.mdx src/content/trainings/my-training.mdx
```

Note the `.mdx` extension — trainings use MDX so you can drop interactive
components into the middle of the text. Required: `title`, `summary`,
`audience`, `objectives`, `duration`, `updated`.

**You do not need to import anything.** These components are available in every
training file automatically:

| Component | What it is |
|---|---|
| `<ScenarioCard>` | A situation for participants to work with |
| `<ReflectionPrompt>` | A question to sit with, optionally with a private notes box |
| `<Quiz>` | A multiple-choice check with a response per option |
| `<RevealCard>` | Something to think about before the answer is shown |
| `<StepSequence>` / `<Step>` | A numbered run-sheet of moves |
| `<DecisionChoice>` | A branching decision with consequences per choice |
| `<DownloadResource>` | A link to a worksheet or guide |
| `<FacilitatorNote>` | Guidance for whoever is running the session |
| `<Callout>` | A short emphasised line naming the move a section makes |
| `<FrameworkGrid>` / `<FrameworkItem>` | The numbered parts of a framework |
| `<PracticeGrid>` / `<Practice>` | "Things to try this week", each with a payoff line |
| `<SelfAssessment>` | Five questions, four levels; tallies the answers and reports a band |
| `<GoDeeper>` | Escalating ways to take the skill further |

`src/content/trainings/_TEMPLATE.mdx` shows all of them in use, and
`src/content/trainings/asset-mapping.mdx` is a complete worked example.

### Linking modules together

A training can declare which other modules it connects to:

```yaml
related:
  - 'stakeholder-mapping'
  - 'building-trust-with-others'
```

These render as cross-links at the foot of the page. Modules that don't exist
yet are skipped silently, so you can list them before you build them. Keeping
the relationships in frontmatter rather than writing links by hand means that a
future tool — "build me a session around the skills I want to work on" — has
structured data to read rather than prose to parse.

To add a new component, build it in `src/components/training/` and add it to
the `trainingComponents` object in `src/pages/training/[slug].astro`. It then
becomes available in every training file.

### Making a training unlisted

Two independent switches, on any content type:

```yaml
listed: false   # not in any index, nav, sitemap, or RSS — but the page still builds
draft: true     # same, plus a visible "Working draft" badge on the page
```

Either one keeps the page out of listings and adds a `noindex` tag asking
search engines not to list it. **The page is still built and anyone with the URL
can read it.** Unlisted means "shareable by link", not "private". If something
must not be readable by a stranger who guesses the URL, don't put it in this
repository at all.

To share a work-in-progress module with a colleague: set `listed: false`, push,
and send them `yoursite.com/training/the-slug`.

### The provenance field on trainings

Every training carries an `affiliation` field that prints an attribution line
on the page:

- `personal-prototype` — the default. "Developed independently; not affiliated
  with or endorsed by any organisation."
- `personal-adaptation` — for work informed by professional experience but not
  an official product. Add `affiliationNote` to give the context.
- `organizational` — only where that is literally true and you have the standing
  to say it. The build **requires** `affiliationNote` naming the organisation.

It defaults to the most conservative option, so a module can never imply
official endorsement by omission. The Training Lab also carries a standing note
saying the same thing, on the landing page and at the foot of every module.

---

## Where things go

| What | Where | Notes |
|---|---|---|
| Images used in content | `public/images/` | Reference as `/images/name.jpg` — with the leading slash |
| PDFs, worksheets, slides | `public/downloads/` | Reference as `/downloads/name.pdf` |
| Your CV PDF | `public/downloads/cv.pdf` | Linked from `/cv` and the About page |

Resize images before adding them. A photo straight off a phone can be 5MB;
anything over about 300KB is worth shrinking. Aim for 1600px wide at most.

Whenever you set an `image`, you must also set `imageAlt` describing it for
someone who can't see it. The build enforces this.

---

## Changing the site itself

| To change | Edit |
|---|---|
| Navigation items | The `nav` array in `src/config.ts` |
| Your name, tagline, description | `src/config.ts` |
| Social links | The `profiles` array in `src/config.ts` |
| Colours, spacing, fonts, sizes | `src/styles/tokens.css` — everything traces back here |
| The CV | `src/data/cv.ts` |
| Homepage text | `src/pages/index.astro` |

`src/styles/tokens.css` is the one to know. Change `--color-accent` and every
link, rule, and focus ring on the site changes with it.

---

## Deploying

### 1. Push to GitHub

If the repository isn't on GitHub yet:

```bash
cd ~/Sites/nathanielmillard-site
git init
git add .
git commit -m "Initial site"
```

Then create an **empty** repository on github.com (no README, no .gitignore —
this project already has both), and connect it:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

### 2. Connect it to Netlify

1. Log in to [netlify.com](https://netlify.com)
2. **Add new site → Import an existing project → GitHub**
3. Authorise Netlify and pick the repository
4. Netlify reads `netlify.toml` and fills the settings in for you. Confirm they say:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 22 (set in `netlify.toml`)
5. **Deploy**

The first build takes a minute or two. Netlify gives you an address like
`random-name-12345.netlify.app`. You can rename that under **Site configuration
→ Site details → Change site name**.

### 3. Your custom domain

Once the site is deploying correctly:

1. Netlify → **Domain management → Add a domain** → type your domain
2. Netlify tells you what to change at your registrar (wherever you bought the
   domain). You have two options:
   - **Point the nameservers at Netlify** (Netlify's recommendation — it then
     manages DNS for you), or
   - **Add records at your existing DNS host** — an `A` record for the bare
     domain pointing at Netlify's load balancer, and a `CNAME` for `www`
     pointing at your `.netlify.app` address. Netlify shows the exact values.
3. DNS changes take anywhere from a few minutes to a few hours to propagate.

Do this only when you're ready — pointing a live domain at an unfinished site
is the one step that's awkward to undo quickly.

### 4. HTTPS

Netlify issues a free Let's Encrypt certificate automatically once the domain
resolves, usually within a few minutes. You don't have to do anything, and it
renews itself. If **Domain management → HTTPS** still says "waiting on DNS"
after an hour, DNS hasn't propagated yet — wait, then click **Verify DNS
configuration**.

### 5. Making updates afterwards

```bash
git add .
git commit -m "Add essay on evacuation timing"
git push
```

That's it. Netlify sees the push and rebuilds within a minute or two. Every
deploy is kept, so if something goes wrong you can roll back from **Deploys →
select an older deploy → Publish deploy**.

---

## The contact form

The form on `/contact` is handled by Netlify Forms. Netlify scans the built HTML
at deploy time, finds the form marked `data-netlify="true"`, and starts
collecting submissions. Your email address never appears anywhere in the page
source.

- Submissions arrive under **Forms** in the Netlify dashboard
- Turn on email notifications: **Forms → Settings → Form notifications**
- The free tier covers **100 submissions per month**
- A hidden honeypot field catches most spam automatically

**The form does not work in `npm run dev`** — only on the deployed site. That's
expected, not a bug.

---

## Troubleshooting

**`npm run build` fails with a message about a content field.**
Astro is telling you a Markdown file's frontmatter doesn't match the schema. The
message names the file and the field. Compare it against the `_TEMPLATE` file in
the same folder.

**A new post doesn't appear on the site.**
Almost always `draft: true` or `listed: false` still in the frontmatter. Check
those two lines first.

**`npm run dev` says the port is in use.**
An earlier dev server is still running. Close the other terminal, or run
`npm run dev -- --port 4322`.

**Netlify build fails but it worked locally.**
Usually a file that wasn't committed. Run `git status` — if it lists files under
"Untracked", `git add` them and push again. Also check the Netlify deploy log:
it shows the same error message you'd see locally.

**The site deployed but everything is unstyled.**
Check `site:` in `astro.config.mjs` matches your real domain.

**An image doesn't show up.**
The path needs a leading slash and must match the file exactly, including
capitals: `/images/projects/photo.jpg`, not `images/Projects/Photo.JPG`.

**I broke something and don't know what.**
`git diff` shows what changed since the last commit. `git checkout -- .` throws
away all uncommitted changes and returns you to the last working state.

---

## Working on this with an AI assistant

The codebase is organised to be quick for an AI to understand. If you're asking
Claude or ChatGPT to make a change, pointing it at the right file saves a lot of
back-and-forth:

- **Content schemas and their rules** → `src/content.config.ts`
- **Design tokens** → `src/styles/tokens.css`
- **Site metadata and navigation** → `src/config.ts`
- **Shared content helpers** → `src/lib/content.ts`
- **Training components** → `src/components/training/`

Two things worth telling it: this site deliberately avoids React and other
client frameworks, and the training components are built to work with
JavaScript disabled. Both are easy to accidentally undo.

---

## Still to do

See `PLACEHOLDERS.md` — every invented word and missing file on the site is
listed there.
