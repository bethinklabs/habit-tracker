# Getting started: from a brand-new Mac to the project

Follow these steps in order. You do not need to know anything about coding or the terminal. Each step is one thing: type or paste a command, press Return, and wait for it to finish before the next step.

**Tip:** to paste a command, click inside the Terminal window and press Command+V, then press Return.

## 1. Open the Terminal

The Terminal is an app where you type commands instead of clicking buttons.

1. Press **Command+Space** to open Spotlight search.
2. Type `Terminal`.
3. Press **Return**.

A window with some text and a blinking cursor opens. That is the Terminal.

## 2. Make a folder for your projects

This makes a folder called `workspace` and moves you inside it. Type each line, pressing Return after each one.

```bash
mkdir workspace
cd workspace
```

`mkdir` makes a folder. `cd` moves into it. Everything you download from here on lands in this folder.

## 3. Install Claude Code

Claude Code is the assistant you will work with. Paste this and press Return:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Wait for it to finish. If it asks for your Mac password, type it and press Return. The password stays invisible while you type. That is normal.

## 4. Install git

`git` is the tool that downloads the project. Paste this and press Return:

```bash
xcode-select --install
```

A small window pops up. Click **Install**, agree to the terms, and wait for it to finish. This can take a few minutes. If it says the tools are already installed, you are fine to move on.

## 5. Download the project

This copies the project into your `workspace` folder. Paste this and press Return:

```bash
git clone https://github.com/bethinklabs/habit-tracker.git
```

Then move into the project folder:

```bash
cd habit-tracker
```

## 6. Hand off to Claude

You now have the project and Claude Code. Start Claude in this folder:

```bash
claude
```

Sign in when it asks. Once it is ready, type this to it:

> Read the README and set up all dependencies.

Claude takes over from here. The README has the rest of the setup and the workflow you will follow.

**If you see `command not found: claude`:** close the Terminal window, open a new one (Step 1), and run these two lines first, then try `claude` again:

```bash
cd workspace/habit-tracker
claude
```

## All the commands, in order

For quick reference, here is every command from start to finish:

```bash
mkdir workspace
cd workspace
curl -fsSL https://claude.ai/install.sh | bash
xcode-select --install
git clone https://github.com/bethinklabs/habit-tracker.git
cd habit-tracker
claude
```
