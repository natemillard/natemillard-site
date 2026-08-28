// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Find content marked `listed: false` or `draft: true` so those pages stay
 * out of sitemap.xml. The pages are STILL BUILT and reachable at their direct
 * URL — hiding them from the sitemap (plus the noindex tag added in SEO.astro)
 * just keeps them out of search engines. See README → "Unlisted and draft".
 */
function hiddenPaths() {
  const routeFor = { writing: 'writing', projects: 'work', trainings: 'training' };
  const hidden = [];
  for (const [dir, route] of Object.entries(routeFor)) {
    const abs = path.join(process.cwd(), 'src', 'content', dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (file.startsWith('_') || !/\.mdx?$/.test(file)) continue;
      const frontmatter = fs.readFileSync(path.join(abs, file), 'utf8').split(/^---\s*$/m)[1] ?? '';
      if (/^\s*listed:\s*false\s*$/m.test(frontmatter) || /^\s*draft:\s*true\s*$/m.test(frontmatter)) {
        hidden.push(`/${route}/${file.replace(/\.mdx?$/, '')}/`);
      }
    }
  }
  return hidden;
}

const hidden = hiddenPaths();

export default defineConfig({
  // Used for absolute URLs in the sitemap and the RSS feed. Safe to set before
  // DNS is cut over — it only affects the URLs written into those files.
  site: 'https://natemillard.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !hidden.some((h) => page.endsWith(h)) }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
