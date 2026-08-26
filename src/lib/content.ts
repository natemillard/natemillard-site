/**
 * Shared helpers for reading content collections.
 *
 * The important one is `visible()`: it applies the draft/listed rules in a
 * single place, so no index page can accidentally leak unlisted content.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

type Listable = { draft: boolean; listed: boolean; featured: boolean };

/** True if an entry should appear in listings, navigation, feeds, and search. */
export function isVisible(data: Listable) {
  return data.listed && !data.draft;
}

/** All entries in a collection that belong in listings, newest first. */
export async function visible<C extends 'writing' | 'projects' | 'trainings'>(
  collection: C
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  return entries.filter((e) => isVisible(e.data as unknown as Listable));
}

/** Sort helper: newest first, by whichever date field the collection uses. */
export function byDateDesc<T extends { data: Record<string, unknown> }>(
  field: string
) {
  return (a: T, b: T) => {
    const av = a.data[field] as Date | undefined;
    const bv = b.data[field] as Date | undefined;
    return (bv?.getTime() ?? 0) - (av?.getTime() ?? 0);
  };
}

/** Format a date for display: "March 2026" or "14 March 2026". */
export function formatDate(date: Date, opts: { day?: boolean } = {}) {
  return new Intl.DateTimeFormat('en-GB', {
    day: opts.day ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "2024 – 2026", "2024 – present", or just "2024" for a single year. */
export function formatRange(start: Date, end?: Date, ongoing = false) {
  const s = start.getUTCFullYear();
  if (ongoing) return `${s} – present`;
  if (!end) return `${s}`;
  const e = end.getUTCFullYear();
  return s === e ? `${s}` : `${s} – ${e}`;
}

/** Every tag used across visible writing, with counts, alphabetical. */
export async function writingTags() {
  const entries = await visible('writing');
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count, slug: slugifyTag(tag) }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** Turn a tag into a URL-safe slug: "Disaster Preparedness" → "disaster-preparedness". */
export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
