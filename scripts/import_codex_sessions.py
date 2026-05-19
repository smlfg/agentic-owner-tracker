#!/usr/bin/env python3
"""Build a privacy-preserving owner map from local Codex session files.

This importer intentionally does not store prompts, responses, file contents,
or JSONL payloads. It only counts session files and JSONL records per day.
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any


DEFAULT_ROOT = Path.home() / ".codex" / "sessions"
VALID_STATES = {"empty", "agent", "overload", "human", "owner"}


@dataclass(frozen=True)
class SessionFile:
    path: Path
    day: date


def parse_day_from_path(path: Path, root: Path) -> date | None:
    try:
        rel = path.relative_to(root)
        year, month, day = rel.parts[:3]
        return date(int(year), int(month), int(day))
    except (ValueError, IndexError):
        return None


def iter_session_files(root: Path, since: date, until: date) -> list[SessionFile]:
    if not root.exists():
        return []

    files: list[SessionFile] = []
    for path in root.glob("*/*/*/*.jsonl"):
        day = parse_day_from_path(path, root)
        if day is None or day < since or day > until:
            continue
        files.append(SessionFile(path=path, day=day))
    return sorted(files, key=lambda item: (item.day, item.path.name))


def count_jsonl_records(path: Path) -> int:
    try:
        with path.open("rb") as handle:
            return sum(1 for line in handle if line.strip())
    except OSError as error:
        print(f"WARN: could not read {path}: {error}", file=sys.stderr)
        return 0


def load_overrides(path: Path | None) -> dict[str, dict[str, Any]]:
    if not path or not path.exists():
        return {}
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise SystemExit(f"ERROR: invalid overrides file {path}: {error}") from error

    days = raw.get("days", {})
    if isinstance(days, list):
        return {str(item.get("date")): item for item in days if item.get("date")}
    if isinstance(days, dict):
        return {str(day): value for day, value in days.items() if isinstance(value, dict)}
    raise SystemExit("ERROR: overrides must contain a 'days' object or list")


def classify_day(agent_sessions: int) -> str:
    if agent_sessions == 0:
        return "empty"
    if agent_sessions >= 5:
        return "overload"
    return "agent"


def date_range(start: date, end: date) -> list[date]:
    total = (end - start).days
    return [start + timedelta(days=offset) for offset in range(total + 1)]


def build_owner_map(
    root: Path,
    since: date,
    until: date,
    overrides: dict[str, dict[str, Any]] | None = None,
) -> dict[str, Any]:
    overrides = overrides or {}
    sessions_by_day: Counter[date] = Counter()
    events_by_day: Counter[date] = Counter()

    for session in iter_session_files(root, since, until):
        sessions_by_day[session.day] += 1
        events_by_day[session.day] += count_jsonl_records(session.path)

    days = []
    for day in date_range(since, until):
        key = day.isoformat()
        override = overrides.get(key, {})
        agent_sessions = int(sessions_by_day[day])
        observed_events = int(events_by_day[day])
        state = str(override.get("state") or classify_day(agent_sessions))
        if state not in VALID_STATES:
            state = classify_day(agent_sessions)

        human_markers = int(override.get("human_markers", 1 if state == "human" else 0))
        owner_signals = int(override.get("owner_signals", 1 if state == "owner" else 0))
        notes = override.get("notes", [])
        if not isinstance(notes, list):
            notes = [str(notes)]

        days.append(
            {
                "date": key,
                "state": state,
                "agent_sessions": agent_sessions,
                "observed_events": observed_events,
                "human_markers": human_markers,
                "owner_signals": owner_signals,
                "notes": [str(note) for note in notes],
            }
        )

    return {
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "source": "codex-sessions",
        "privacy": "no_raw_prompts_no_responses",
        "sessions_root": str(root),
        "days": days,
    }


def resolve_window(args: argparse.Namespace) -> tuple[date, date]:
    today = date.today()
    until = args.until or today
    since = args.since or (until - timedelta(days=args.days - 1))
    if since > until:
        raise SystemExit("ERROR: --since must be before or equal to --until")
    return since, until


def main() -> int:
    parser = argparse.ArgumentParser(description="Import Codex session metadata into an Owner Signal Grid JSON file.")
    parser.add_argument("--sessions-root", type=Path, default=DEFAULT_ROOT, help="Codex sessions root")
    parser.add_argument("--output", type=Path, default=Path("data/local-owner-map.json"), help="Output JSON path")
    parser.add_argument("--overrides", type=Path, help="Optional local overrides JSON")
    parser.add_argument("--days", type=int, default=42, help="Number of days ending at --until or today")
    parser.add_argument("--since", type=date.fromisoformat, help="Start date YYYY-MM-DD")
    parser.add_argument("--until", type=date.fromisoformat, help="End date YYYY-MM-DD")
    args = parser.parse_args()

    if args.days < 1:
        raise SystemExit("ERROR: --days must be positive")

    since, until = resolve_window(args)
    overrides = load_overrides(args.overrides)
    owner_map = build_owner_map(args.sessions_root.expanduser(), since, until, overrides)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(owner_map, indent=2) + "\n", encoding="utf-8")
    print(f"Written: {args.output}")
    print("Privacy: no raw prompts, responses, or JSONL payloads were written.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

