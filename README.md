# SkillBridge NG

Learn a skill. Build a real project. Showcase it. Discover opportunities.

## What this is

SkillBridge NG is a learning platform MVP. A user registers, follows a
step-by-step roadmap for a skill, completes lessons, starts a guided
project tied to that skill, works through its checklist, marks it
complete, and the finished project appears automatically in a public
showcase page. Users can also browse and save opportunity listings
(internships, junior roles, traineeships).

## Running it locally

This is a standard Create React App project.

```
npm install
npm start
```

This opens the app at http://localhost:3000.

To create a production build:

```
npm run build
```

The build output goes to `/build` and can be deployed to any static
host (Vercel, Netlify, GitHub Pages, S3 + CloudFront, etc).

## Architecture

- `src/data/Data.js` - the static content: skills, their roadmaps and
  lessons, the project catalog (with a checklist per project), and a
  sample list of opportunity listings.
- `src/utils/` - small, focused modules: `storage.js` (localStorage
  wrapper), `auth.js` (account creation/login/password hashing),
  `progressStore.js` (lesson completion per skill), `projectStore.js`
  (project status/checklist/notes), `opportunityStore.js` (saved
  opportunities), `validate.js` (input validation/cleaning).
- `src/context/AuthContext.js` - the current-user context consumed by
  every page.
- `src/components/` - shared UI: Navbar, Footer, ProtectedRoute, Icon
  (hand-built SVG icon set, no emoji, no icon library), ProgressBar,
  EmptyState, Banner.
- `src/pages/` - one file per route. See `src/App.js` for the full
  route table.

## Premium (subscription)

SkillBridge NG has a Premium tier: a one-time ₦20,000 upgrade (see `/subscribe`)
that unlocks a "Go Deeper" section on all 48 lessons across every skill
(`src/data/deepDives.js`) plus the Advanced capstone lesson on every
roadmap, two Premium-only projects (Student Result Portal, AI Chat
Assistant), and printable completion certificates.

**Checkout is real. Verification is not.** The `/subscribe` page opens
Paystack's own Inline checkout widget (`https://js.paystack.co/v1/inline.js`),
so a completed payment is a real charge processed by Paystack. Set
`REACT_APP_PAYSTACK_PUBLIC_KEY` in a `.env` file (see `.env.example`) to
your real Paystack public key before deploying, or checkout stays
disabled.

What this project cannot do without a backend is verify that charge
independently. The correct flow is: frontend collects payment and gets a
reference back from Paystack -> that reference is sent to a server ->
the server calls Paystack's Verify Transaction endpoint using the
*secret* key -> only then does the server mark the account premium. This
project has no server, so `/subscribe` grants premium directly in the
browser (`activatePremium()` in `src/utils/subscriptionStore.js`) as
soon as Paystack's widget reports success. In practice, a real paying
user is correctly unlocked; a technically capable visitor could still
open devtools and call that function directly without paying. This is
disclosed on the `/subscribe` page itself, not hidden in fine print.
Closing that gap is the single most important thing to build before
this could handle real payments at any scale.

## Important limitation: no backend

This MVP has **no server**. Every account, password, lesson completion,
project state and saved opportunity lives only in the browser's
localStorage. This was a deliberate MVP scope decision, not an
oversight, but it has real consequences:

- Data does not sync across browsers or devices.
- Clearing site data (or using a different browser/incognito window)
  loses everything.
- Passwords are hashed with SHA-256 before storage so they are not kept
  in plain text, but **this is not real authentication security**.
  Anyone with access to the browser profile can read or edit the
  stored data directly. Do not reuse a real password when trying this
  MVP.

A production version would replace every function in `src/utils/auth.js`,
`progressStore.js`, `projectStore.js` and `opportunityStore.js` with
calls to a real API. The rest of the app (all the pages and components)
was written against those modules as a clean seam, so that swap would
not require rewriting the UI.

## Custom domain

This build is plain static output and works with any custom domain your
host supports (e.g. point a domain's DNS at your Vercel/Netlify
project and add it in that host's dashboard). Provisioning an actual
domain isn't something that can be done from inside this project.

## Content note

Opportunity listings in `Data.js` are sample data for demonstrating the
feature and use placeholder organizations and `example.com` apply
links. Swap in a real feed or API before treating this as a live
opportunities board.
