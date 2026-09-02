# darcangel-projects

The hub site at **https://projects.darcangel.com** — a landing page plus one
page per project, each showing that project's README pulled live from its own
repo.

Built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages by
GitHub Actions.

```
src/
  _data/
    site.json        site title / url / author
    projects.json    the project list  <- edit this to add a project
    readmes.js       fetches + renders each project's README.md at build time
  _includes/
    layout.njk       shared page shell
  index.njk          the landing page (card grid from projects.json)
  project.njk        one generated page per projects.json entry -> /<slug>/
  404.njk, sitemap.njk, robots.njk
  assets/
    style.css
    projects/        screenshots, one per project, named <slug>.<ext>
  CNAME              projects.darcangel.com
.github/workflows/build.yml   build + deploy
docs/trigger-rebuild.yml      workflow to copy into each project repo
```

## Add or change a project

1. Add an object to `src/_data/projects.json`:

   ```json
   {
     "slug": "myproject",
     "name": "myProject",
     "tagline": "One line that shows on the card and page header.",
     "owner": "yaturner",
     "repo": "myProject",
     "branch": "main",
     "url": "https://github.com/yaturner/myProject",
     "screenshot": "/assets/projects/myproject.png",
     "status": "active",
     "tags": ["c++", "qt"]
   }
   ```

2. Drop a screenshot at `src/assets/projects/<slug>.<ext>` (optional but nice).
3. Commit. The Action rebuilds and the page appears at `/<slug>/`.

`owner` / `repo` / `branch` are used to fetch `README.md` from
`raw.githubusercontent.com` and to rewrite repo-relative image paths in it to
absolute URLs, so screenshots embedded in the README resolve. Set `branch` to
the repo's actual default branch (it varies: `myWeatherPanel` and `tcamViewer2`
use `master`, `tcamViewerDesktop` uses `main`).

The `screenshot` key is optional — omit it and the card/page just skips the
image. `tcamViewerDesktop` and `tcamViewer2` have none yet; add
`src/assets/projects/<slug>.<ext>` and the key when you have one.

## Local development

```
nvm use            # Node 20
npm install
npm run serve      # http://localhost:8080, live reload
npm run build      # writes _site/
```

READMEs are cached under `.cache/` for 1 hour during local builds; delete it or
run `npm run clean` to force a refetch.

## Deploy

`.github/workflows/build.yml` runs on:

- push to `main`
- a nightly cron (re-pulls the project READMEs)
- manual dispatch
- `repository_dispatch` type `readme-updated` (sent by the project repos)

One-time GitHub setup:

- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
- The `github-pages` environment is created automatically on first deploy.
- The workflow uses `npm install` (no lockfile committed yet). Run
  `npm install` locally once and commit `package-lock.json` to switch to
  `npm ci` + dependency caching.

## Keep project pages in sync immediately

Without this, README edits show up on the next nightly build. To make them show
up right away, copy `docs/trigger-rebuild.yml` into each project repo as
`.github/workflows/notify-hub.yml` and add a `HUB_DISPATCH_TOKEN` secret there —
instructions are in that file's header.

## DNS / custom domain

The site serves from `projects.darcangel.com` (see `src/CNAME`).

1. At the DNS host for `darcangel.com`, add:

   ```
   projects   CNAME   yaturner.github.io.
   ```

2. **Settings → Pages → Custom domain:** `projects.darcangel.com`, then tick
   **Enforce HTTPS** once the certificate is issued.

3. Point the old address at the new one: in whatever repo currently serves
   `tecamviewer.darcangel.com`, either move its content in here as a project and
   change its `CNAME`, or replace its `index.html` with a redirect:

   ```html
   <!doctype html><meta charset="utf-8" />
   <meta http-equiv="refresh" content="0; url=https://projects.darcangel.com/tcamviewer2/" />
   <link rel="canonical" href="https://projects.darcangel.com/tcamviewer2/" />
   ```
