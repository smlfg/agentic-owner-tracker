const DEFAULT_DATA = {
  generated_at: "2026-05-18T20:00:00+02:00",
  source: "demo",
  privacy: "no_raw_prompts_no_responses",
  days: [
    { date: "2026-04-07", state: "agent", agent_sessions: 2, observed_events: 130, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-08", state: "agent", agent_sessions: 3, observed_events: 210, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-09", state: "overload", agent_sessions: 7, observed_events: 530, human_markers: 0, owner_signals: 0, notes: ["Too many agent outputs needed routing."] },
    { date: "2026-04-10", state: "agent", agent_sessions: 2, observed_events: 144, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-11", state: "human", agent_sessions: 1, observed_events: 60, human_markers: 1, owner_signals: 0, notes: ["Manual marker: real human grounding."] },
    { date: "2026-04-12", state: "empty", agent_sessions: 0, observed_events: 0, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-13", state: "agent", agent_sessions: 4, observed_events: 310, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-14", state: "agent", agent_sessions: 3, observed_events: 240, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-15", state: "overload", agent_sessions: 6, observed_events: 470, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-16", state: "agent", agent_sessions: 2, observed_events: 120, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-17", state: "human", agent_sessions: 0, observed_events: 0, human_markers: 1, owner_signals: 0, notes: [] },
    { date: "2026-04-18", state: "agent", agent_sessions: 2, observed_events: 118, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-19", state: "agent", agent_sessions: 4, observed_events: 290, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-20", state: "overload", agent_sessions: 8, observed_events: 620, human_markers: 0, owner_signals: 0, notes: ["Output moved faster than acceptance."] },
    { date: "2026-04-21", state: "agent", agent_sessions: 2, observed_events: 140, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-22", state: "empty", agent_sessions: 0, observed_events: 0, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-23", state: "agent", agent_sessions: 3, observed_events: 220, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-24", state: "agent", agent_sessions: 4, observed_events: 330, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-25", state: "human", agent_sessions: 1, observed_events: 80, human_markers: 1, owner_signals: 0, notes: [] },
    { date: "2026-04-26", state: "agent", agent_sessions: 2, observed_events: 100, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-27", state: "overload", agent_sessions: 5, observed_events: 410, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-28", state: "agent", agent_sessions: 2, observed_events: 155, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-29", state: "agent", agent_sessions: 3, observed_events: 190, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-04-30", state: "agent", agent_sessions: 4, observed_events: 300, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-01", state: "overload", agent_sessions: 9, observed_events: 710, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-02", state: "agent", agent_sessions: 2, observed_events: 133, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-03", state: "empty", agent_sessions: 0, observed_events: 0, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-04", state: "agent", agent_sessions: 3, observed_events: 260, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-05", state: "agent", agent_sessions: 4, observed_events: 310, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-06", state: "overload", agent_sessions: 6, observed_events: 455, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-07", state: "human", agent_sessions: 1, observed_events: 70, human_markers: 1, owner_signals: 0, notes: [] },
    { date: "2026-05-08", state: "agent", agent_sessions: 3, observed_events: 205, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-09", state: "agent", agent_sessions: 2, observed_events: 150, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-10", state: "overload", agent_sessions: 5, observed_events: 390, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-11", state: "agent", agent_sessions: 4, observed_events: 305, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-12", state: "agent", agent_sessions: 3, observed_events: 215, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-13", state: "overload", agent_sessions: 7, observed_events: 540, human_markers: 0, owner_signals: 0, notes: ["Many outputs, weak stop boundary."] },
    { date: "2026-05-14", state: "human", agent_sessions: 2, observed_events: 110, human_markers: 1, owner_signals: 0, notes: [] },
    { date: "2026-05-15", state: "agent", agent_sessions: 3, observed_events: 225, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-16", state: "agent", agent_sessions: 2, observed_events: 160, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-17", state: "overload", agent_sessions: 6, observed_events: 430, human_markers: 0, owner_signals: 0, notes: [] },
    { date: "2026-05-18", state: "owner", agent_sessions: 5, observed_events: 360, human_markers: 0, owner_signals: 1, notes: ["One owner decision became visible again."] }
  ]
};

const STATE_COPY = {
  empty: "No agentic pressure recorded.",
  agent: "Agent work moved. Output entered the human world.",
  overload: "Agent output density is high enough to create ownership pressure.",
  human: "Manual human-grounding marker.",
  owner: "Owner signal: one decision became holdable again."
};

let currentData = DEFAULT_DATA;
let selectedDate = DEFAULT_DATA.days[DEFAULT_DATA.days.length - 1].date;

const els = {
  grid: document.getElementById("owner-grid"),
  source: document.getElementById("source-label"),
  status: document.getElementById("status-line"),
  sessions: document.getElementById("metric-sessions"),
  overload: document.getElementById("metric-overload"),
  owner: document.getElementById("metric-owner"),
  human: document.getElementById("metric-human"),
  dayState: document.getElementById("day-state"),
  detailDate: document.getElementById("detail-date"),
  detailState: document.getElementById("detail-state"),
  detailSessions: document.getElementById("detail-sessions"),
  detailEvents: document.getElementById("detail-events"),
  detailNotes: document.getElementById("detail-notes")
};

document.getElementById("load-demo").addEventListener("click", () => {
  setData(DEFAULT_DATA, "Demo data loaded.");
});

document.getElementById("load-local").addEventListener("click", async () => {
  try {
    const data = await fetchJson("data/local-owner-map.json");
    setData(data, "Local map loaded from data/local-owner-map.json.");
  } catch (error) {
    setStatus("No local map found. Generate it with scripts/import_codex_sessions.py.");
  }
});

document.getElementById("file-input").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    setData(data, `Imported ${file.name}.`);
  } catch (error) {
    setStatus(`Could not import JSON: ${error.message}`);
  }
});

async function fetchJson(path) {
  if (window.location.protocol === "file:") {
    throw new Error("Use a local server for file loading.");
  }
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

function setData(data, message) {
  currentData = normalizeData(data);
  selectedDate = currentData.days[currentData.days.length - 1]?.date || null;
  setStatus(message);
  render();
}

function normalizeData(data) {
  if (!data || !Array.isArray(data.days)) {
    throw new Error("Expected JSON with a days array.");
  }

  const days = data.days
    .map((day) => ({
      date: String(day.date),
      state: ["empty", "agent", "overload", "human", "owner"].includes(day.state) ? day.state : "empty",
      agent_sessions: Number(day.agent_sessions || 0),
      observed_events: Number(day.observed_events || day.event_count || 0),
      human_markers: Number(day.human_markers || 0),
      owner_signals: Number(day.owner_signals || 0),
      notes: Array.isArray(day.notes) ? day.notes.map(String) : []
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-42);

  return {
    generated_at: data.generated_at || "",
    source: data.source || "imported",
    privacy: data.privacy || "unknown",
    days
  };
}

function render() {
  renderMetrics();
  renderGrid();
  renderDetail();
}

function renderMetrics() {
  const days = currentData.days;
  els.source.textContent = currentData.source || "unknown";
  els.sessions.textContent = sum(days, "agent_sessions");
  els.overload.textContent = days.filter((day) => day.state === "overload").length;
  els.owner.textContent = sum(days, "owner_signals");
  els.human.textContent = days.filter((day) => day.state === "human").length;
}

function renderGrid() {
  els.grid.innerHTML = "";
  for (const day of currentData.days) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `day-cell ${day.state}${day.date === selectedDate ? " selected" : ""}`;
    button.dataset.date = day.date;
    button.dataset.day = day.date.slice(-2);
    button.title = `${day.date}: ${day.state}`;
    button.setAttribute("aria-label", `${day.date}, ${day.state}, ${day.agent_sessions} agent sessions`);
    button.addEventListener("click", () => {
      selectedDate = day.date;
      render();
    });
    els.grid.appendChild(button);
  }
}

function renderDetail() {
  const day = currentData.days.find((item) => item.date === selectedDate) || currentData.days[currentData.days.length - 1];
  if (!day) return;
  els.dayState.textContent = STATE_COPY[day.state] || STATE_COPY.empty;
  els.detailDate.textContent = day.date;
  els.detailState.textContent = day.state;
  els.detailSessions.textContent = String(day.agent_sessions);
  els.detailEvents.textContent = String(day.observed_events);
  els.detailNotes.textContent = day.notes.length ? day.notes.join(" ") : "No notes for this day.";
}

function setStatus(message) {
  els.status.textContent = message;
}

function sum(days, key) {
  return days.reduce((total, day) => total + Number(day[key] || 0), 0);
}

setData(DEFAULT_DATA, "Demo data loaded.");

