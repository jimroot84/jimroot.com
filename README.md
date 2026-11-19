# jimroot.com

Personal site for Jim Root: a photo-first homepage, a Camera Roll, Winston and the flock, email subscribe, and a contact form.

- **Built with:** [Astro](https://astro.build) (static site; photos are resized and compressed automatically at build time)
- **Hosted on:** Cloudflare Workers (static assets, free plan)
- **Edited with:** [Pages CMS](https://app.pagescms.org), which works from a phone browser
- **Contact form:** [Web3Forms](https://web3forms.com) (free, 250 messages/month)
- **Email subscribers:** [Kit](https://kit.com) free Newsletter plan (subscriber list lives in Kit)
- **RSS feed:** `/rss.xml`

## Posting a photo from your phone

1. Open **app.pagescms.org** and sign in with GitHub.
2. Pick this repository → **Camera Roll** → **Add an entry**.
3. Tap **Photo**, choose a picture (JPG, PNG or WebP), and fill in **Location or title**. Caption and date are optional.
4. Tap **Save**. Cloudflare rebuilds the site in about a minute; the newest photo appears at the top of the homepage.

Flock counts, Winston's bio, the About text and other site details are under **Site info & flock counts**.

> iPhone note: photos picked in Safari upload as JPG automatically. If one ever fails, it's likely a HEIC file; re-share it as JPG.

## Where things live

| What | File |
| --- | --- |
| Photo posts | `src/content/photos/*.md` |
| Photos | `src/assets/photos/` |
| Site text, flock counts, keys | `src/data/site.json` |
| Pages CMS setup | `.pages.yml` |
| Homepage | `src/pages/index.astro` |
| Camera Roll page | `src/pages/camera-roll.astro` |
| Side nav and colors | `src/layouts/Base.astro` |

## Run locally (optional)

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```
