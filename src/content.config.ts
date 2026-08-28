/* =========================================================================
   CONTENT COLLECTIONS
   ------------------------------------------------------------------------
   This file defines the shape of every piece of content on the site.

   A "collection" is just a folder of Markdown files. The schema below says
   which frontmatter fields each file may have, which are required, and what
   type they must be. If you get a field wrong, the build fails with a clear
   message naming the file and the field — which is a feature, not a problem:
   it means a typo can never quietly break a page.

   To add content you never touch this file. You copy the _TEMPLATE file in
   the relevant folder and fill it in. Only edit this file when you want a
   NEW KIND of field to exist.

   Three shared conventions, used by all three collections:

     draft: true     → hidden from all index pages, shows a "Working draft"
                       badge on its own page, and asks search engines not to
                       list it. The page IS still built.
     listed: false   → hidden from all index pages and from search engines,
                       with no badge. The page IS still built and anyone with
                       the URL can read it. This is "unlisted", not "private".
     featured: true  → eligible to appear on the homepage.

   Anything that must not be readable by a stranger who guesses the URL
   should not be in this repository at all.
   ========================================================================= */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Fields shared by every collection, so the three schemas stay consistent. */
const shared = {
  /** Shown as the page's <h1> and in listings. */
  title: z.string(),

  /** One or two sentences. Used in listings, previews, and metadata. */
  summary: z.string(),

  /** Freeform topic labels. Writing tags get their own archive pages. */
  tags: z.array(z.string()).default([]),

  /** Path under /public, e.g. '/images/writing/levee.jpg'. Optional. */
  image: z.string().optional(),

  /** Required whenever `image` is set — describe the image for screen readers. */
  imageAlt: z.string().optional(),

  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  listed: z.boolean().default(true),
};

/* -------------------------------------------------------------------------
   WRITING — essays, research, publications, talks, reflections
   File: src/content/writing/my-essay.md
   ---------------------------------------------------------------------- */

const writing = defineCollection({
  loader: glob({
    base: './src/content/writing',
    // The '!**/_*' rule keeps _TEMPLATE files (and any other file you prefix
    // with an underscore) out of the build entirely — they are notes, not pages.
    pattern: ['**/*.{md,mdx}', '!**/_*'],
  }),
  schema: z
    .object({
      ...shared,

      /** Publication or writing date. Written as 2026-03-14. */
      date: z.coerce.date(),

      /** Drives the label on cards and the filters on /writing. */
      type: z.enum(['essay', 'research', 'publication', 'talk', 'reflection']),

      /** Journal, outlet, conference, or venue. Optional. */
      source: z.string().optional(),

      /**
       * If the piece lives somewhere else, put the URL here. The listing
       * will link straight out rather than to a page on this site.
       */
      externalUrl: z.string().url().optional(),

      /** Optional DOI, e.g. '10.1080/example'. Rendered as a link. */
      doi: z.string().optional(),
    })
    .refine((d) => !d.image || !!d.imageAlt, {
      message: 'imageAlt is required whenever image is set (accessibility).',
      path: ['imageAlt'],
    }),
});

/* -------------------------------------------------------------------------
   PROJECTS — selected professional and research work
   File: src/content/projects/my-project.md
   ---------------------------------------------------------------------- */

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    // The '!**/_*' rule keeps _TEMPLATE files (and any other file you prefix
    // with an underscore) out of the build entirely — they are notes, not pages.
    pattern: ['**/*.{md,mdx}', '!**/_*'],
  }),
  schema: z
    .object({
      ...shared,

      /** Your role on the project, e.g. 'Research lead'. */
      role: z.string(),

      /** People or organisations you worked with. Optional. */
      collaborators: z.array(z.string()).default([]),

      /** Written as 2024-06 or 2024-06-01. */
      startDate: z.coerce.date(),

      /** Leave out if the work is ongoing — set `ongoing: true` instead. */
      endDate: z.coerce.date().optional(),
      ongoing: z.boolean().default(false),

      /** Short bullet statements of what the work produced or changed. */
      outcomes: z.array(z.string()).default([]),

      /** Related links: reports, coverage, project sites. */
      links: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .default([]),

      /** Files in /public/downloads. */
      downloads: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
            note: z.string().optional(),
          })
        )
        .default([]),

      /** Extra images, shown beneath the description. */
      gallery: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .default([]),

      /** Lower numbers sort first on /work. Ties fall back to date. */
      order: z.number().optional(),
    })
    .refine((d) => !d.image || !!d.imageAlt, {
      message: 'imageAlt is required whenever image is set (accessibility).',
      path: ['imageAlt'],
    }),
});

/* -------------------------------------------------------------------------
   TRAININGS — Training Lab modules, prototypes, and learning tools
   File: src/content/trainings/my-training.mdx      ← note: .mdx

   These use MDX rather than plain Markdown so you can drop interactive
   components straight into the text:

       <ScenarioCard title="...">...</ScenarioCard>

   See src/content/trainings/_TEMPLATE.mdx for the full list.
   ---------------------------------------------------------------------- */

const trainings = defineCollection({
  loader: glob({
    base: './src/content/trainings',
    // The '!**/_*' rule keeps _TEMPLATE files (and any other file you prefix
    // with an underscore) out of the build entirely — they are notes, not pages.
    pattern: ['**/*.{md,mdx}', '!**/_*'],
  }),
  schema: z
    .object({
      ...shared,

      /** Who this is designed for, in plain language. */
      audience: z.string(),

      /**
       * What a participant should be able to do afterwards.
       * Written as verbs: 'Identify the three signals that...'
       */
      objectives: z.array(z.string()).min(1),

      /** Human-readable, e.g. '45–60 minutes' or 'Two 90-minute sessions'. */
      duration: z.string(),

      /** How it is delivered. */
      format: z
        .enum(['in-person', 'virtual', 'hybrid', 'self-paced'])
        .default('in-person'),

      /** Where this sits in its own development. Shown as a small label. */
      stage: z
        .enum(['concept', 'prototype', 'pilot-ready', 'field-tested'])
        .default('prototype'),

      /* ---------------------------------------------------------------
         AFFILIATION — read this one carefully.

         This field controls the attribution line printed on the training
         page. It defaults to the most conservative option, so a module can
         never be implied to be an official organisational product simply
         because the field was left out.

           personal-prototype   → "A personal prototype. Not affiliated with
                                   or endorsed by any organisation."
           personal-adaptation  → "A personal adaptation of ideas developed
                                   in the course of professional work. Not an
                                   official product of any organisation."
                                   Use `affiliationNote` to name the context.
           organizational       → An official product of a named organisation.
                                   ONLY use this where that is literally true
                                   and you have the standing to say so. It
                                   requires `affiliationNote` naming the body.
         --------------------------------------------------------------- */
      affiliation: z
        .enum(['personal-prototype', 'personal-adaptation', 'organizational'])
        .default('personal-prototype'),

      /** One sentence of context for the attribution line. */
      affiliationNote: z.string().optional(),

      /** Worksheets, slides, facilitator guides — files in /public/downloads. */
      resources: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
            note: z.string().optional(),
            /** e.g. 'PDF', 'Slides', 'Worksheet' — shown as a small label. */
            kind: z.string().optional(),
          })
        )
        .default([]),

      /**
       * Filenames (without extension) of other trainings this one connects to.
       * Renders as cross-links at the foot of the page. Keeping the
       * relationships as data rather than as hand-written prose links means a
       * future "build a session around X" tool has something to read.
       *
       *   related: ['stakeholder-mapping', 'building-trust']
       */
      related: z.array(z.string()).default([]),

      /** Last meaningful revision. Shown on the page. */
      updated: z.coerce.date(),
    })
    .refine((d) => !d.image || !!d.imageAlt, {
      message: 'imageAlt is required whenever image is set (accessibility).',
      path: ['imageAlt'],
    })
    .refine((d) => d.affiliation !== 'organizational' || !!d.affiliationNote, {
      message:
        'affiliationNote is required when affiliation is "organizational" — name the organisation.',
      path: ['affiliationNote'],
    }),
});

export const collections = { writing, projects, trainings };
