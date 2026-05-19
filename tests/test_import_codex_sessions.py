import importlib.util
import json
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "import_codex_sessions.py"
SPEC = importlib.util.spec_from_file_location("import_codex_sessions", SCRIPT)
importer = importlib.util.module_from_spec(SPEC)
sys.modules["import_codex_sessions"] = importer
SPEC.loader.exec_module(importer)


class ImportCodexSessionsTests(unittest.TestCase):
    def write_session(self, root: Path, day: str, name: str, lines: int = 2) -> None:
        year, month, date_part = day.split("-")
        target = root / year / month / date_part
        target.mkdir(parents=True, exist_ok=True)
        payload = '{"message":"SECRET_PROMPT_SHOULD_NOT_LEAK"}\n'
        (target / name).write_text(payload * lines, encoding="utf-8")

    def test_counts_sessions_and_events_without_raw_text(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_session(root, "2026-05-17", "a.jsonl", lines=3)
            self.write_session(root, "2026-05-17", "b.jsonl", lines=2)
            self.write_session(root, "2026-05-18", "c.jsonl", lines=1)

            data = importer.build_owner_map(root, date(2026, 5, 17), date(2026, 5, 18))
            by_date = {day["date"]: day for day in data["days"]}

            self.assertEqual(by_date["2026-05-17"]["agent_sessions"], 2)
            self.assertEqual(by_date["2026-05-17"]["observed_events"], 5)
            self.assertEqual(by_date["2026-05-17"]["state"], "agent")
            self.assertEqual(by_date["2026-05-18"]["agent_sessions"], 1)
            self.assertNotIn("SECRET_PROMPT_SHOULD_NOT_LEAK", json.dumps(data))

    def test_overload_and_overrides(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for index in range(5):
                self.write_session(root, "2026-05-18", f"{index}.jsonl", lines=1)

            data = importer.build_owner_map(
                root,
                date(2026, 5, 18),
                date(2026, 5, 18),
                overrides={
                    "2026-05-18": {
                        "state": "owner",
                        "owner_signals": 1,
                        "notes": ["Decision became ownable."]
                    }
                },
            )

            day = data["days"][0]
            self.assertEqual(day["agent_sessions"], 5)
            self.assertEqual(day["state"], "owner")
            self.assertEqual(day["owner_signals"], 1)


if __name__ == "__main__":
    unittest.main()
