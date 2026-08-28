/* =========================================================================
   CV CONTENT
   ------------------------------------------------------------------------
   The online CV at /cv is generated from this file. To update it, edit the
   relevant object — the page follows automatically.

   Drawn from your 2026 resume. Two deliberate omissions: your phone number
   and your work email address are NOT here. Publishing either on a personal
   site invites spam and ties the site to an employer inbox; the contact form
   at /contact reaches you without exposing an address.

   The downloadable PDF is separate — put your own file at
   public/downloads/cv.pdf.
   ========================================================================= */

export interface CVEntry {
  title: string;
  organisation?: string;
  location?: string;
  period: string;
  description?: string;
  points?: string[];
}

export interface CVSection {
  heading: string;
  note?: string;
  entries: CVEntry[];
}

export const cvIntro = {
  summary:
    'Collaborative organizational leader, coach, facilitator, and educator with more than twenty years of experience helping individuals, teams, and communities build their capacity to lead change. I use inquiry, listening, data, and relationship-centered approaches to help leaders challenge assumptions, identify assets, navigate competing priorities, and translate community knowledge into strategy that holds.',
  location: 'Chico, California',
  focus: [
    'Leadership development and inquiry-based coaching',
    'Community mobilization, resilience, and cross-sector collaboration',
    'Adult and experiential learning, facilitation, and program design',
  ],
};

export const cvSections: CVSection[] = [
  {
    heading: 'Experience',
    entries: [
      {
        title: 'Community Mobilization Coach, Pacific Division',
        organisation: 'American Red Cross',
        period: '2026 – present',
        description: 'One-year divisional leadership assignment.',
        points: [
          'Coach regional and chapter leadership teams in applying community mobilization principles to strategy, planning, partnerships, program delivery, and community engagement across the Pacific Division.',
          'Build leadership capacity through inquiry-based coaching — strengthening listening, reflection, facilitation, decision-making, prioritization, and relationship-building practices.',
          'Guide teams from needs-based service delivery toward asset-based approaches that identify local strengths, trusted leaders, informal networks, and opportunities for shared ownership.',
          'Coach leaders to integrate quantitative data with qualitative community knowledge, examine what may be missing from the available evidence, and let learning change decisions rather than justify them.',
          'Strengthen inclusive facilitation, stakeholder mapping, and shared decision-making so communities influence outcomes rather than only provide input.',
          'Help teams distinguish organizational outputs from community-level outcomes, and move from direct implementation toward enabling and transferring ownership to local leaders.',
        ],
      },
      {
        title: 'Program Manager, Community Disaster Risk Reduction and Community Adaptation',
        organisation: 'American Red Cross, Gold Country Region',
        period: '2020 – 2026',
        points: [
          'Served on regional leadership supporting community resilience and disaster preparedness across a 26-county Northern California region, building partnerships with nonprofit, government, philanthropic, and community stakeholders.',
          'Directed a $1.2M program budget and established structured grant review and stewardship processes for hyper-local resilience investments.',
          'Helped partners secure more than $3M in external grant funding for locally led initiatives building community capacity before, during, and after disasters.',
          'Advanced resilience infrastructure including community resilience hubs, 31 cold-chain units, and 17 electric vehicles supporting local disaster and community needs.',
          'Led collaborative teams in GIS mapping, data management, grant development, and project design with government and nonprofit partners.',
          'Convened cross-sector resilience networks and large-scale learning events, including a regional resilience symposium engaging more than 400 participants.',
        ],
      },
      {
        title: 'YSEALI Academic Program Director',
        organisation: 'California State University, Chico',
        period: '2025',
        points: [
          'Designed and led a U.S. Department of State-approved academic program exploring sustainability and resilience through ecological, social, and community perspectives.',
          'Built an experiential learning program for participants from more than twelve countries, combining classroom learning, field experience, reflection, and applied project development.',
          'Designed learning tours in Sacramento, Baltimore, and Washington, D.C., connecting participants with different models of resilience, leadership, and public-sector practice.',
        ],
      },
      {
        title: 'Coordinator, Undergraduate Research and Assessment',
        organisation: 'California State University, Chico',
        period: '2019 – 2020',
        points: [
          'Designed assessment tools and impact-measurement approaches for equity-focused student success programs and institutional initiatives.',
          'Managed research teams, projects, and budgets, translating findings into practical recommendations for university programs.',
        ],
      },
      {
        title: 'Sustainability and Climate Change Pathway Coordinator',
        organisation: 'California State University, Chico',
        period: '2018 – 2020',
        points: [
          'Led cross-departmental faculty collaboration to develop climate justice curriculum integrating sustainability, resilience, mental health, and social equity.',
          'Developed and presented pedagogical strategies integrating equity, sustainability, resilience, and student development.',
          'Conducted and published research on sustainability education, human behavior, mental health, and social equity.',
        ],
      },
      {
        title: 'First-Year Experience Program — multiple roles',
        organisation: 'California State University, Chico',
        period: '2012 – 2020',
        points: [
          'Directed staff and managed a $100K+ budget for student success programs improving retention, graduation, belonging, and leadership development.',
          'Created capacity-building training, stakeholder engagement events, and professional development for faculty, staff, students, and peer mentors.',
          'Supervised and developed peer mentors through structured coaching, reflection, and leadership practice.',
        ],
      },
    ],
  },
  {
    heading: 'Earlier leadership, teaching, and experiential education',
    entries: [
      {
        title: 'Trip Leader, Student Trainer, and Outdoor Educator',
        organisation: 'Adventure Outings, California State University, Chico',
        period: '2000 – 2006',
        points: [
          'Led wilderness, rafting, and outdoor recreation experiences for university students, managing group dynamics, judgment, safety, and decision-making in consequential environments.',
          'Progressed from student trip leader to training other leaders and teaching outdoor education, using experiential learning, managed risk, reflection, and challenge to develop confidence and teamwork.',
        ],
      },
      {
        title: 'Adjunct Faculty, English',
        organisation: 'Ashford University',
        period: 'c. 2005 – 2010',
        points: [
          'Taught undergraduate composition, literature, and film online, with emphasis on foundational composition and academic writing.',
          'Supported adult learners in developing writing, critical thinking, and academic confidence across varied backgrounds and levels of preparation.',
        ],
      },
      {
        title: 'Accreditation Committee Member',
        organisation: 'Wilderness Education Association',
        period: 'c. 2005 – 2010',
        description:
          'Contributed to accreditation review and quality assurance supporting standards in wilderness education, outdoor leadership, and risk management.',
      },
      {
        title: 'Manager',
        organisation: 'El Paredon Surf House',
        location: 'Guatemala',
        period: 'c. 2006 – 2007',
        description:
          'Managed daily operations of a surf lodge on the Guatemalan coast, coordinating staff, guests, logistics, and community relationships in a cross-cultural, resource-constrained setting.',
      },
      {
        title: 'Fly-Fishing Guide',
        organisation: 'Karluk Lodge',
        location: 'Alaska',
        period: 'c. 1996 – 1998',
        description:
          'Guided clients in remote Alaskan environments, managing safety, logistics, changing conditions, and group experience.',
      },
    ],
  },
  {
    heading: 'Education',
    entries: [
      {
        title: 'Ph.D., Human Dimensions of Ecosystem Science and Management',
        organisation: 'Utah State University',
        period: '2014',
        description:
          'Dissertation: Cultural Entropy — A Grounded Theory Study of Early Childhood Experiences in Nature in the Arroyo Grande Creek Watershed.',
      },
      {
        title: 'M.A., English',
        organisation: 'California State University, Chico',
        period: '2006',
      },
      {
        title: 'B.A., English',
        organisation: 'California State University, Chico',
        period: '2004',
      },
    ],
  },
];

export const cvSkills: { group: string; items: string[] }[] = [
  {
    group: 'Leadership and coaching',
    items: [
      'Leadership coaching and development',
      'Inclusive facilitation and group dynamics',
      'Organizational change and systems thinking',
      'Strategic planning and prioritization',
    ],
  },
  {
    group: 'Community and learning',
    items: [
      'Community mobilization and resilience',
      'Asset and stakeholder mapping',
      'Adult and experiential learning',
      'Cross-sector partnerships',
    ],
  },
  {
    group: 'Programs and evidence',
    items: [
      'Program design and outcome measurement',
      'Data-informed decision making',
      'Grant development and resource mobilization',
      'Equity-centered community engagement',
    ],
  },
];
