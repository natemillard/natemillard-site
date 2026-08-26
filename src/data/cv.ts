/* =========================================================================
   CV CONTENT
   ------------------------------------------------------------------------
   The online CV at /cv is generated from this file. Editing it is the same
   as editing a list — add an object to the right array and the page updates.

   EVERYTHING BELOW MARKED [PLACEHOLDER] IS INVENTED and must be replaced.
   It is here so you can see the layout working with realistic shapes.

   The downloadable PDF is separate: put your own file at
   public/downloads/cv.pdf. See src/config.ts → cvDownload.
   ========================================================================= */

export interface CVEntry {
  /** e.g. a job title, degree, or award name. */
  title: string;
  /** Employer, institution, or awarding body. */
  organisation?: string;
  location?: string;
  /** Displayed as written, e.g. '2023 – present' or '2019'. */
  period: string;
  /** Optional short paragraph. */
  description?: string;
  /** Optional bullet points. */
  points?: string[];
}

export interface CVSection {
  /** Section heading, e.g. 'Experience'. */
  heading: string;
  /** Optional one-line note under the heading. */
  note?: string;
  entries: CVEntry[];
}

export const cvIntro = {
  /** A short professional summary. Two or three sentences at most. */
  summary:
    '[PLACEHOLDER] Researcher and training designer working at the intersection of disaster preparedness, community resilience, and adult learning. Current work focuses on how communities organise themselves before, during, and after disruption — and on designing learning experiences that build that capacity rather than simply describing it.',
  location: '[PLACEHOLDER] Chico, California',
  /** Shown as a short list under the summary. Delete if not wanted. */
  focus: [
    '[PLACEHOLDER] Community mobilization and volunteer capacity',
    '[PLACEHOLDER] Disaster preparedness and post-disaster recovery',
    '[PLACEHOLDER] Instructional design and facilitation',
  ],
};

export const cvSections: CVSection[] = [
  {
    heading: 'Experience',
    entries: [
      {
        title: '[PLACEHOLDER] Position title',
        organisation: '[PLACEHOLDER] Organisation',
        location: '[PLACEHOLDER] California',
        period: '2024 – present',
        points: [
          '[PLACEHOLDER] A concrete statement of responsibility or accomplishment.',
          '[PLACEHOLDER] Another, ideally with a number or a named outcome.',
        ],
      },
      {
        title: '[PLACEHOLDER] Previous position',
        organisation: '[PLACEHOLDER] Organisation',
        period: '2021 – 2024',
        points: ['[PLACEHOLDER] What you did and what changed because of it.'],
      },
    ],
  },
  {
    heading: 'Education',
    entries: [
      {
        title: '[PLACEHOLDER] MA, Field of study',
        organisation: '[PLACEHOLDER] University',
        period: '2021',
        description: '[PLACEHOLDER] Thesis title or a one-line note, if useful.',
      },
      {
        title: '[PLACEHOLDER] BA, Field of study',
        organisation: '[PLACEHOLDER] University',
        period: '2018',
      },
    ],
  },
  {
    heading: 'Teaching & Training',
    note: 'Courses, workshops, and facilitation.',
    entries: [
      {
        title: '[PLACEHOLDER] Course or workshop name',
        organisation: '[PLACEHOLDER] Institution',
        period: '2023 – present',
        description: '[PLACEHOLDER] One line on the audience and the approach.',
      },
    ],
  },
  {
    heading: 'Service & Community',
    entries: [
      {
        title: '[PLACEHOLDER] Role',
        organisation: '[PLACEHOLDER] Organisation or coalition',
        period: '2022 – present',
      },
    ],
  },
  {
    heading: 'Selected Awards & Recognition',
    entries: [
      {
        title: '[PLACEHOLDER] Award name',
        organisation: '[PLACEHOLDER] Awarding body',
        period: '2024',
      },
    ],
  },
];

/**
 * Skills / methods, shown as a simple grouped list.
 * Delete the whole export and its use in src/pages/cv.astro if you'd rather
 * not have this section.
 */
export const cvSkills: { group: string; items: string[] }[] = [
  {
    group: '[PLACEHOLDER] Research',
    items: ['Qualitative interviewing', 'Survey design', 'Spatial analysis'],
  },
  {
    group: '[PLACEHOLDER] Practice',
    items: ['Curriculum design', 'Facilitation', 'Volunteer program design'],
  },
];
