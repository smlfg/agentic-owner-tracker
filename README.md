# Agentic Owner Tracker

> **Local-first HAI proof tool** that turns your AI agent session log into a
> visible **owner signal grid** — so you can see when agent work creates
> progress, overload, or a real owner decision.

<div align="center">

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Visibility: public](https://img.shields.io/badge/visibility-public-success.svg)](#)
[![Stack: static HTML / JS + Python](https://img.shields.io/badge/stack-HTML%20%2B%20JS%20%2B%20Python-informational)](#project-shape)
[![Privacy: no raw prompts stored](https://img.shields.io/badge/privacy-no%20raw%20prompts-orange.svg)](#privacy-boundary)

</div>

---

## What problem does it solve?

Strong agents don't just create output — they create **follow-up
responsibility**: verify this, accept that, reject this, route this,
remember that, stop here.

A week of heavy agent use leaves a trail of JSONL session files on your
disk. Those files tell you *what ran*, but not whether the human behind
them still has a grip on what happens next. **Mapping agent work** here
means turning that raw session trail into a per-day map of four explicit
states, so the ownership question becomes visible:

| Grid state    | Meaning                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| `empty`       | No agent sessions that day.                                                                          |
| `agent`       | Agent work happened. Output is moving, decisions are cheap.                                          |
| `overload`    | Agent sessions crossed the threshold (≥ 5 per day). Ownership pressure starts to build.              |
| `human`       | Manually marked: real human grounding, not just agent activity.                                      |
| `owner`       | Manually marked: a concrete decision became **ownable** again.                                       |

The grid is intentionally simple. One question, one map.

> Did agentic work stay ownable for the human?

---

## What "local-first" means here

**Local-first** means every byte the tool needs to run lives on your
machine. No accounts, no API calls, no telemetry:

- The web app is **static** — open `index.html` over `python3 -m http.server`,
  or deploy the folder to GitHub Pages unchanged.
- The Codex importer (`scripts/import_codex_sessions.py`) reads session file
  paths and counts JSONL records. It **never** copies prompts, responses,
  file contents, secrets, or browser data.
- The generated `data/local-owner-map.json` and your
  `data/local-overrides.json` are git-ignored (see `.gitignore`).
- A committed `data/demo-owner-map.json` ships with the repo, so the app
  renders meaningful state out of the box — no real sessions required.

---

## Quick start (demo data)

```bash
git clone https://github.com/smlfg/agentic-owner-tracker.git
cd agentic-owner-tracker
python3 -m http.server 8765
# open http://127.0.0.1:8765
```

The shipped demo grid covers ~42 days and includes all five states so the
UI is not empty on first launch.

---

## Quick start (your real Codex sessions)

The importer scans `~/.codex/sessions/YYYY/MM/DD/*.jsonl` by default and
emits a privacy-preserving owner map:

```bash
# 1. Generate the map (writes to data/local-owner-map.json)
python3 scripts/import_codex_sessions.py --output data/local-owner-map.json

# 2. Serve the UI
python3 -m http.server 8765
```

Then in the UI click **Load local map**. The importer accepts
`--sessions-root`, `--since`, `--until`, `--days`, and `--overrides` — see
`--help` for the full list.

### Mark owner signals by hand

Some days are more about human state than session density. Copy and edit
the overrides template:

```bash
cp data/local-overrides.example.json data/local-overrides.json
```

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

Then regenerate with the overrides applied:

```bash
python3 scripts/import_codex_sessions.py \
  --overrides data/local-overrides.json \
  --output data/local-owner-map.json
```

---

## Sample output

### Test suite

```
$ python3 -m unittest discover -s tests
..
----------------------------------------------------------------------
Ran 2 tests in 0.002s

OK
```

### Importer run

Reproducible with the synthetic fixture below — three days, 12 sessions
total, day 2 deliberately crosses the overload threshold:

```text
$ python3 scripts/import_codex_sessions.py \
    --sessions-root /tmp/fake-codex \
    --since 2026-05-14 --until 2026-05-16 \
    --output /tmp/sample-map.json
Written: /tmp/sample-map.json
Privacy: no raw prompts, responses, or JSONL payloads were written.
```

```json
{
  "generated_at": "2026-09-18T22:57:31+02:00",
  "source": "codex-sessions",
  "privacy": "no_raw_prompts_no_responses",
  "sessions_root": "/tmp/fake-codex",
  "days": [
    { "date": "2026-05-14", "state": "agent",    "agent_sessions": 3, "observed_events":  6, "human_markers": 0, "owner_signals": 0, "notes": [] },
    { "date": "2026-05-15", "state": "overload", "agent_sessions": 7, "observed_events": 70, "human_markers": 0, "owner_signals": 0, "notes": [] },
    { "date": "2026-05-16", "state": "agent",    "agent_sessions": 2, "observed_events":  6, "human_markers": 0, "owner_signals": 0, "notes": [] }
  ]
}
```

### What the UI shows

The grid renders one cell per day, color-coded by state:

```
2026-05-14   2026-05-15   2026-05-16
  agent       overload       agent
   3/6         7/70           2/6
```

The right-hand detail panel reads the metrics and notes for the selected
cell; the legend explains each state; the bottom **Meaning** panel states
the question the grid is built to answer.

---

## Use cases

- **Daily stand-up for solo agent-heavy work.** Instead of "what did I ship
  yesterday?", ask "did yesterday stay ownable?" — and look at the grid.
- **Weekly retro.** Scan the row for `overload` cells. Read the notes. Did
  you ship, or did you just accumulate follow-ups?
- **Owner-signal practice.** Mark one `owner` day per week: the day a real
  decision became visible. Over time the row should not be all `agent`.
- **Privacy-respecting sharing.** The exported JSON contains only counts,
  states, and human-written notes. You can drop it into a screen share or
  a blog post without leaking prompts.
- **Counter-weight to a productivity dashboard.** Most dashboards reward
  *more output*. This one rewards *more ownership*.

---

## Limitations

V1 is deliberately small. Things it does **not** do:

- **No LLM call.** It does not summarize sessions, classify intent, or
  judge quality. State is derived from counts plus your manual marks.
- **Codex-only import.** The importer expects the
  `~/.codex/sessions/YYYY/MM/DD/<id>.jsonl` layout. Adapting it to other
  agent runtimes (Hermes profiles, Cursor sessions, Aider logs, etc.)
  means changing `iter_session_files` and `parse_day_from_path`.
- **Single-user, single-timezone.** No auth, no sync, no conflict
  resolution. Two humans editing overrides is out of scope.
- **Owner signals are hand-marked.** The tool surfaces counts; it does not
  invent meaning. If you never mark `human` or `owner` days, the grid
  will be all `agent` / `overload` / `empty`.
- **42-day default window.** Configurable with `--days` / `--since` /
  `--until`, but the UI is optimized for one to two months at a time.
- **No build step.** That is a feature (deploy by copying the folder) and
  a limitation (no TypeScript, no bundler, no framework).
- **No write-back to Codex.** The importer is read-only against session
  files.

---

## Privacy boundary

- Importer output contains only derived metadata: date, session count,
  event count, state, owner-signal counters, notes.
- `data/local-owner-map.json` and `data/local-overrides.json` are git-ignored.
- The committed `data/demo-owner-map.json` is hand-written fixture data,
  not derived from real sessions.
- See `PUBLISHING.md` for the file-level commit / no-commit policy.

---

## Project shape

```text
agentic-owner-tracker/
├── .gitattributes                       # line-ending + linguist hygiene
├── .gitignore                           # local maps and overrides ignored
├── LICENSE                              # MIT, © 2026 Samuel Fleig
├── README.md                            # this file
├── PUBLISHING.md                        # commit policy + Pages setup
├── index.html                           # static UI shell (no build step)
├── styles.css
├── app.js                               # grid render + load handler
├── data/
│   ├── demo-owner-map.json              # committed demo data (UI works OOTB)
│   └── local-overrides.example.json
├── scripts/
│   └── import_codex_sessions.py         # privacy-preserving importer
└── tests/
    └── test_import_codex_sessions.py
```

---

## Tests

```bash
python3 -m unittest discover -s tests
```

---

## Deploy

No build step. Drop the folder on any static host (GitHub Pages, Netlify,
`python3 -m http.server`). See `PUBLISHING.md` for the GitHub Pages
recipe.

---

## License

MIT — see [`LICENSE`](LICENSE). Copyright © 2026 Samuel Fleig.