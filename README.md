# Habit Tracker: a Claude Code learning sandbox

This is a blank [Next.js](https://nextjs.org) app that you build into a working habit tracker. It is teaching material. The point is not the finished app, it is learning the workflow you use to get there with Claude.

You will practice five tools together:

- **Claude** — Anthropic's AI assistant.
- **Claude Code** — the coding agent you run in your terminal, inside this repo.
- **Superpowers** — a Claude Code plugin that adds structured workflow skills (brainstorming, writing-plans, executing-plans, and more).
- **Claude Design** — a design tool on [claude.ai](https://claude.ai) and in the Claude Desktop app for creating a feature's UI before you build it.
- **Playwright** — end-to-end browser testing, so each feature has a concrete "done" to reach.

The repo ships empty on purpose. Your job is to fill it in one feature at a time.

## Setup

This assumes a Mac with nothing installed for development.

You install Claude Code yourself first. After that, you can open Claude Code in this folder and say **"read the README and set up all dependencies,"** and Claude will run the rest for you. A few steps are interactive (signing in, plugin install, prompts); those are marked below so you know when to step in.

**1. Install Claude Code (you do this).**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Then start it in this folder and sign in when prompted:

```bash
claude
```

**2. Install the system tools.**

```bash
# Git and compilers (macOS asks you to confirm a download)
xcode-select --install

# Homebrew, the macOS package manager
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js (this project needs Node 20.9 or newer; Homebrew installs current Node plus npm)
brew install node
```

**3. Install the app's dependencies.**

```bash
npm install
```

**4. Add the Superpowers plugin.** Run this inside a Claude Code session (it is a slash command, not a shell command):

```
/plugin install superpowers@claude-plugins-official
```

**5. Add the Playwright browser tools for Claude.** This lets Claude open and drive a real browser to check your app:

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

**6. Add Playwright as the test framework.** Answer the prompts; this creates `playwright.config.ts` and installs the test browsers:

```bash
npm init playwright
```

**7. Run the app.**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page reloads as you edit files.

Claude Design has nothing to install. Open [claude.ai](https://claude.ai) in your browser, or the Claude Desktop app, when it is time to design a feature.

## How to use this repo

You build the habit tracker with two loops: brainstorm the whole product once, then build each feature in a repeating loop.

### Step 1: Brainstorm the whole product

Start Claude Code in this folder and use Superpowers brainstorming to turn "a habit tracker" into a concrete list of features.

```
/superpowers:brainstorming
```

Work with Claude until you have a feature list you are happy with. That list drives everything after this.

### Step 2: Build each feature in a loop

For every feature on the list, repeat these steps until the feature is done:

1. **Brainstorm the feature in detail.** Run `/superpowers:brainstorming` again, this time on one feature. Pin down how it behaves and where it stops.
2. **Design it.** Open Claude Design on [claude.ai](https://claude.ai) or in the Claude Desktop app and create the UI for the feature. This design is your visual target.
3. **Write the test cases.** Define Playwright tests that describe what the feature does when it works. The design plus these tests are the goal you build toward.
4. **Plan and build it.** Use `/superpowers:writing-plans` to turn the feature into an implementation plan, then `/superpowers:executing-plans` to build it.
5. **Loop until it matches.** Keep going until the running app matches the design and every Playwright test passes. Then move to the next feature.

## Running and testing

```bash
# Develop
npm run dev            # http://localhost:3000

# Run the Playwright tests against a production build
npm run build
npm run start          # in one terminal
npx playwright test    # in another terminal
```

The app lives in `app/`. Start at `app/page.tsx`. This repo uses the Next.js App Router.

Note for Claude: this Next.js has breaking changes from older versions (see `AGENTS.md`). Read the matching guide in `node_modules/next/dist/docs/` before writing code.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Claude Code documentation](https://code.claude.com/docs)
- [Superpowers plugin](https://github.com/obra/superpowers)
- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright with Next.js](https://nextjs.org/docs/app/guides/testing/playwright)
