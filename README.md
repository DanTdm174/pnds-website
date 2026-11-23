# PNDS Website

Site for the Pacific Northwest Debate Society. It's plain HTML and CSS hosted on GitHub Pages, so there's nothing to install or build. Edit a file, push to `main`, and the live site updates in a few minutes:

https://dantdm174.github.io/pnds-website/

## Files

- `index.html` is the whole site. Everything is on one page.
- `styles.css` has all the styling. Colours and fonts are at the top under `:root`.
- `site.js` does three small things: the footer year, the "Read bio" buttons, and the class sign-up form.
- `assets/` has the logo, icons, team photos, other photos, and the link preview image (`og-image.jpg`).
- `404.html` is the "page not found" page.
- `mission.html`, `services.html`, `team.html` and `get-involved.html` are old pages from before we went to one page. They just redirect to the right section of the home page so old links still work. Don't delete them.

## Common edits

All of these are in `index.html`. Search for the text you want to change.

**Upcoming event.** Find the `<article class="event">` block under "Upcoming events". Change the date badge, the meta line, the title and the description. If you add a second event, copy the whole `<article>`.

**Class sign-up form.** It doesn't send anything by itself. It opens an email to pnds.inquiry@gmail.com with the student's answers filled in, and they press send. If the course name changes, update the subject and first line in `site.js` (search for "Fall Courses").

**Past events.** Each one is an `<li class="past-item">` in the "Past events" list. Put the newest at the top.

**Impact numbers.** Under the hero there are three numbers that currently show "—". Replace the dash in each `<dd class="impact-num">` with the real figure.

**Team.** Each exec is one `<article class="member">`. To add someone:

1. Put their photo in `assets/team/`, cropped portrait. 540 × 688 px matches the others.
2. Copy an existing member block and change the photo path, name, role, bio and awards.
3. Give the bio a new `id` and make the button's `aria-controls` match it. Otherwise "Read bio" won't open the right one.

To remove someone, delete their `<article>`.

**Hero photo.** Replace `assets/photos/team-canada-flag.jpg` or point the `<img>` at a new file. It gets cropped to 4:3, so landscape photos work best. Update the caption under it too.

**Sponsorship package.** Right now the button emails us asking for it. Once there's a PDF, put it in `assets/` and change the button's `href` to the file path and add `download`.

## After editing CSS or JS

Browsers hang on to old copies of `styles.css` and `site.js`. When you change either one, bump the number at the end of its link in `index.html` (and `404.html` for the CSS), e.g. `styles.css?v=8` to `styles.css?v=9`. Otherwise people (and you) might keep seeing the old version.

## Images

Keep photos small or the page gets slow on phones. Around 1200 px wide is plenty for the hero, and team photos are 540 px wide. Save as JPG. If a file is over ~200 KB, shrink it before adding it.

If you change the hero or headline, you might want to remake `assets/og-image.jpg` too. That's the picture that shows up when someone shares the link. It needs to be 1200 × 630.

## Contact

Questions about the site: pnds.inquiry@gmail.com
