# Agentic Owner Tracker

A local-first HAI proof tool for seeing when agent work creates progress, overload, or a real owner signal.

It is not a productivity dashboard. It is a small interface for one question:

> Did agentic work stay ownable for the human?

## What It Shows

- **Agent days**: days where agent sessions happened.
- **Overload days**: days where agent sessions became dense enough to create ownership pressure.
- **Human days**: manually marked days with real human grounding.
- **Owner signals**: manually marked days where a concrete decision became ownable again.

The grid is intentionally simple. It turns messy agentic work into a visible state map.

## Privacy Boundary

V1 is local-first and does not store raw prompts, responses, file contents, secrets, or browser data.

The Codex importer reads session file locations and counts JSONL records. The generated output contains only derived metadata such as date, session count, event count, state, and owner-signal counters.

`data/local-owner-map.json` and `data/local-overrides.json` are ignored by git.

## Run The Demo

```bash
cd ~/Projekte/agentic-owner-tracker
python3 -m http.server 8765
```

Open:

```text
http://127.0.0.1:8765
```

The app ships with `data/demo-owner-map.json`, so it works without real logs.

## Generate A Local Map From Codex Sessions

```bash
cd ~/Projekte/agentic-owner-tracker
python3 scripts/import_codex_sessions.py --output data/local-owner-map.json
python3 -m http.server 8765
```

Then open the app and choose **Load local map**.

## Manual Owner Signals

Copy the example overrides file:

```bash
cp data/local-overrides.example.json data/local-overrides.json
```

Edit dates where the human state matters more than the imported session density:

```json
{
  "days": {
    "2026-05-18": {
      "state": "owner",
      "owner_signals": 1,
      "notes": ["One decision became ownable again."]
    }
  }
}
```

Then regenerate:

```bash
python3 scripts/import_codex_sessions.py \
  --overrides data/local-overrides.json \
  --output data/local-owner-map.json
```

## Test

```bash
python3 -m unittest discover -s tests
```

## Project Shape

```text
agentic-owner-tracker/
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── demo-owner-map.json
│   └── local-overrides.example.json
├── scripts/
│   └── import_codex_sessions.py
└── tests/
    └── test_import_codex_sessions.py
```

## HAI Interpretation

The tracker exists because strong agents do not only create output. They create follow-up responsibility: verify this, accept that, reject this, route this, remember that, stop here.

The useful unit is not "more output." The useful unit is: one human can still decide what happens next.

