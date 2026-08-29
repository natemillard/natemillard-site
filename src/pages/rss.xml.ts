import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { visible, byDateDesc } from '../lib/content';

/**
 * RSS feed for the writing collection.
 * Unlisted and draft entries are excluded automatically — `visible()` handles it.
 */
export async function GET(context: APIContext) {
  const entries = (await visible('writing')).sort(byDateDesc('date'));

  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: context.site!,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: entry.data.externalUrl ?? `/writing/${entry.id}/`,
      categories: entry.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
