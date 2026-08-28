/**
 * Site-wide facts, in one place.
 *
 * Almost everything you'd want to change about the shell of the site —
 * your name, the tagline, the navigation, the footer links — lives here
 * rather than being scattered through page files.
 *
 * PLACEHOLDER TEXT is marked with [PLACEHOLDER]. Replace it.
 */

export const site = {
  /** Shown in the header, the <title> suffix, and the footer. */
  name: 'Nathaniel Millard',

  /** One line. Used in metadata and as the header subtitle on wide screens. */
  tagline: '[PLACEHOLDER] Community collaboration, facilitation, and learning design',

  /**
   * Default description for search engines and link previews.
   * Aim for 140–160 characters.
   */
  description:
    '[PLACEHOLDER] The professional site of Nathaniel Millard — work, writing, and learning design on how communities and organisations collaborate.',

  /** Used for the copyright line in the footer. */
  startYear: 2026,

  /**
   * Contact form handling. The form posts to Netlify, so your email address
   * never appears in the page source. See README → "Contact form".
   */
  contactFormName: 'contact',
} as const;

/**
 * Main navigation.
 *
 * To add, remove, or reorder items, edit this array — the header and the
 * mobile menu both read from it, so you only change it once.
 */
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'CV', href: '/cv' },
] as const;

/*
 * The Training Lab is built and working at /training, but deliberately kept
 * out of the navigation for now. The pages are still reachable by direct
 * link, which is useful for showing colleagues without announcing it.
 *
 * To put it back in the site, add this line to `nav` above:
 *   { label: 'Learning', href: '/training' },
 */

/**
 * Footer links. Kept separate from the main nav so the header can stay short.
 * Set `external: true` for links that leave the site.
 */
export const footerLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Writing feed (RSS)', href: '/rss.xml' },
] as const;

/**
 * Social / professional profiles. Delete any you don't want shown.
 * [PLACEHOLDER] — replace these URLs.
 */
export const profiles = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/PLACEHOLDER' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=PLACEHOLDER' },
  { label: 'GitHub', href: 'https://github.com/PLACEHOLDER' },
] as const;

/** Path to the downloadable CV, relative to /public. */
export const cvDownload = '/downloads/cv.pdf';
