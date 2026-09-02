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
import { glob, file } from 'astro/loaders';

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

/* A run of images with captions, used by projects and by writing. `alt` is
   required rather than optional: an image with no alt text is invisible to
   anyone using a screen reader, and a caption is not a substitute — a caption
   is read by everybody, alt text describes what the picture actually shows. */
const gallery = z
  .array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
  )
  .default([]);

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

      /**
       * Drives the label on cards and which lane the piece sits in on /writing.
       *
       *   Research & essays : essay, research, publication, talk
       *   Poems & stories   : poem, fiction, nonfiction, reflection
       *
       * `poem` also changes how the body renders — line breaks are preserved
       * exactly as you type them, which prose Markdown would otherwise collapse.
       */
      type: z.enum([
        'essay', 'research', 'publication', 'talk',
        'reflection', 'poem', 'fiction', 'nonfiction',
      ]),

      /** Journal, outlet, conference, or venue. Optional. */
      source: z.string().optional(),

      /**
       * If the piece lives somewhere else, put the URL here. The listing
       * will link straight out rather than to a page on this site.
       */
      externalUrl: z.string().url().optional(),

      /** Optional DOI, e.g. '10.1080/example'. Rendered as a link. */
      doi: z.string().optional(),

      /**
       * A sequence of photographs shown after the piece, in the order given.
       * For essays that were once blog posts and had pictures with them.
       * They sit after the text rather than inside it, so the prose reads as
       * one piece and the photographs are what you find when you finish.
       */
      gallery,
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
      gallery,

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
       * Optional — self-paced learner pages often carry none.
       */
      objectives: z.array(z.string()).default([]),

      /**
       * Position within a numbered curriculum, if the module belongs to one.
       * Drives the ordering and the "01 / 13" labels on the Training Lab index.
       */
      skillNumber: z.number().int().positive().optional(),

      /**
       * Which group the skill sits in on the index page.
       * Free text, so a different curriculum can use its own names.
       */
      track: z.string().optional(),

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

      /* ---------------------------------------------------------------
         THE MAP — how this skill connects to everything else.

         These three fields are the single source of truth for the whole
         cross-link web. A phase page works out which skills it needs by
         reading every skill's `phases`; a mindset page works out which skills
         practise it by reading every skill's `mindsets`. Nothing stores the
         reverse direction, so the two can never disagree.

         Filenames, not display names: 'shared-ownership', not 'Shared
         Ownership'. A filename that does not exist fails the build.
         --------------------------------------------------------------- */

      /** Where this skill is load-bearing, and where it merely helps. */
      phases: z
        .array(
          z.object({
            code: z.enum(['PL', 'P1', 'P2', 'P3', 'P4']),
            role: z.enum(['load-bearing', 'supporting']),
          })
        )
        .default([]),

      /** Filenames from src/content/mindsets. */
      mindsets: z.array(z.string()).default([]),

      /** Filenames from src/content/frameworks. */
      frameworks: z.array(z.string()).default([]),

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

/* -------------------------------------------------------------------------
   EXERCISES — the activity bank behind the training modules
   File: src/data/exercises.json  (generated, not hand-edited)

   Each record is ONE exercise: an icebreaker, a core experience, a workshop,
   a Socratic guide. Keeping them as separate records rather than as one long
   document per skill is what makes it possible to show "every icebreaker
   across all skills", and later to assemble a session out of parts.

   Regenerate with the converter rather than editing this file by hand.
   ---------------------------------------------------------------------- */

const exercises = defineCollection({
  loader: file('src/data/exercises.json'),
  schema: z.object({
    /** Slug of the training module this belongs to. */
    skill: z.string(),
    title: z.string(),
    /** icebreaker | core | practice | workshop | socratic | prework | element | activity */
    type: z.string(),
    /** Human-readable version of `type`, e.g. "Core experience". */
    typeLabel: z.string(),
    duration: z.string(),
    /** Length in minutes, for sorting and for filtering by time available. */
    minutes: z.number(),
    /** Body content: paragraphs and lists, in order. */
    blocks: z.array(
      z.union([
        z.object({ kind: z.literal('p'), text: z.string() }),
        z.object({ kind: z.literal('list'), items: z.array(z.string()) }),
      ])
    ),
  }),
});


/* -------------------------------------------------------------------------
   PHASES — the five chapter planning phases
   File: src/content/phases/community-discovery.md

   The spine the skills hang off. Which skills each phase asks for is NOT
   stored here; it is read off the skills themselves. See the note on
   `phases` in the trainings schema above.
   ---------------------------------------------------------------------- */

const phases = defineCollection({
  loader: glob({
    base: './src/content/phases',
    pattern: ['**/*.md', '!**/_*'],
  }),
  schema: z.object({
    title: z.string(),

    /** A few words under the title, e.g. 'Choose one place'. */
    subtitle: z.string(),

    /** PL, P1, P2, P3 or P4. This is what the skills refer to. */
    code: z.enum(['PL', 'P1', 'P2', 'P3', 'P4']),

    /** 0 for Pre-Launch, then 1 to 4. Drives the order everywhere. */
    order: z.number().int().min(0),

    summary: z.string(),

    /** How you know the phase is finished. One sentence. */
    bar: z.string(),
  }),
});

/* -------------------------------------------------------------------------
   MINDSETS (6) and FRAMEWORKS (16)
   Files: src/content/mindsets/curiosity.md
          src/content/frameworks/adaptive-leadership.md

   Same shape on purpose. A mindset is a disposition you bring; a framework
   is a model you apply. Both are things a person can get better at, both are
   referred to by filename from the skills, and both render the same way.

   A framework earns its page by having a citation. That is the bar, and
   `source` is required for exactly that reason.
   ---------------------------------------------------------------------- */

const conceptSchema = z.object({
  title: z.string(),

  /** One or two sentences. Shown at the top of the page and in listings. */
  definition: z.string(),

  /** Where the idea comes from. Required: no citation, no page. */
  source: z.string(),

  /** Optional link for the citation above. */
  sourceUrl: z.string().url().optional(),

  /** Mindsets are shown in a fixed order; frameworks are alphabetical. */
  order: z.number().int().optional(),
});

const mindsets = defineCollection({
  loader: glob({ base: './src/content/mindsets', pattern: ['**/*.md', '!**/_*'] }),
  schema: conceptSchema,
});

const frameworks = defineCollection({
  loader: glob({ base: './src/content/frameworks', pattern: ['**/*.md', '!**/_*'] }),
  schema: conceptSchema,
});

/* -------------------------------------------------------------------------
   ACTIVITIES — the tagged activity table
   File: src/data/activities.json (generated, do not hand-edit)

   Read the header of that file's build script before changing anything here.
   Two fields matter more than they look:

     blockMinutes  duration PLUS debrief. Always schedule against this.
                   The stated durations in the source packs exclude the
                   debrief, so anything scheduled on `durationMax` runs long.
     schedulable   false for handouts and other things that are not a slot
                   in an agenda.
   ---------------------------------------------------------------------- */

const activities = defineCollection({
  loader: file('src/data/activities.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    /** Ice Breaker | Practice | Core Experience | Workshop | Handout */
    type: z.string(),
    /** Filename of the skill in src/content/trainings. */
    skill: z.string(),
    skillName: z.string(),
    skillNumber: z.number().nullable(),
    phases: z.array(z.string()).default([]),
    mindsets: z.array(z.string()).default([]),
    frameworks: z.array(z.string()).default([]),
    durationMin: z.number().nullable(),
    durationMax: z.number().nullable(),
    /** 'sourced' if the pack stated it, otherwise it was assigned. */
    durationSource: z.string().nullable(),
    debriefMinutes: z.number().nullable(),
    breakMinutes: z.number().nullable(),
    blockMinutes: z.number().nullable(),
    groupSizeMin: z.number().nullable(),
    groupSizeMax: z.number().nullable(),
    groupSizeSource: z.string().nullable(),
    virtualOk: z.boolean().nullable(),
    schedulable: z.boolean(),
    page: z.number().nullable(),
    /** Matching entry in the exercise bank, where one was found. */
    exerciseId: z.string().nullable(),
  }),
});

export const collections = {
  writing,
  projects,
  trainings,
  exercises,
  phases,
  mindsets,
  frameworks,
  activities,
};
