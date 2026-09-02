// Fetches each project's README.md from GitHub at build time and renders it to
// HTML. Runs once per build; results are exposed to templates as `readmes`
// keyed by project slug, e.g. {{ readmes[project.slug] | safe }}.

import fs from "node:fs";
import EleventyFetch from "@11ty/eleventy-fetch";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

// same source of truth as Eleventy's own `projects` data
const projects = JSON.parse(
  fs.readFileSync("src/_data/projects.json", "utf8")
);

const md = markdownIt({ html: true, linkify: true, typographer: true }).use(
  markdownItAnchor
);

// Rewrite repo-relative image references (markdown and raw <img>) to absolute
// raw.githubusercontent.com URLs so screenshots in the README resolve here.
function absolutizeImages(markdown, project) {
  const base = `https://raw.githubusercontent.com/${project.owner}/${project.repo}/${project.branch}/`;
  return markdown
    .replace(
      /(!\[[^\]]*\]\()(?!https?:|data:|#)\/?([^)]+)(\))/g,
      (_m, pre, rel, post) => `${pre}${base}${rel}${post}`
    )
    .replace(
      /(<img[^>]+src=["'])(?!https?:|data:)\/?([^"']+)(["'])/gi,
      (_m, pre, rel, post) => `${pre}${base}${rel}${post}`
    );
}

export default async function () {
  const out = {};
  for (const project of projects) {
    const url = `https://raw.githubusercontent.com/${project.owner}/${project.repo}/${project.branch}/README.md`;
    try {
      const raw = await EleventyFetch(url, {
        duration: "1h", // cache locally; CI starts cold and fetches fresh
        type: "text",
        directory: ".cache",
      });
      out[project.slug] = md.render(absolutizeImages(raw, project));
    } catch (err) {
      console.warn(`[readmes] ${project.slug}: could not fetch ${url} — ${err.message}`);
      out[project.slug] =
        `<p><em>The README could not be loaded. See the ` +
        `<a href="${project.url}#readme">repository</a>.</em></p>`;
    }
  }
  return out;
}
