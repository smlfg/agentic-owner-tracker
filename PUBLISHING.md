# Publishing

This repository is designed to be published as a static GitHub project.

## Files To Commit

Commit these files:

```text
.gitignore
LICENSE
README.md
PUBLISHING.md
index.html
styles.css
app.js
data/demo-owner-map.json
data/local-overrides.example.json
scripts/import_codex_sessions.py
tests/test_import_codex_sessions.py
```

Do not commit:

```text
data/local-owner-map.json
data/local-overrides.json
```

Those are user-derived local files.

## Local Git Setup

```bash
git init -b main
git add .gitignore LICENSE README.md PUBLISHING.md index.html styles.css app.js \
  data/demo-owner-map.json data/local-overrides.example.json \
  scripts/import_codex_sessions.py tests/test_import_codex_sessions.py
git commit -m "Initial Agentic Owner Tracker"
```

## Create GitHub Repo

```bash
gh repo create agentic-owner-tracker --public --source=. --push
```

## GitHub Pages

Set GitHub Pages to deploy from:

```text
Branch: main
Folder: /
```

The app has no build step.

