export const projects = [
  {
    name: "Family Hub",
    url: "https://www.thefamilyhub.app",
    description:
      "A home-operations app for family calendars, chores, todos, meals, weather, and weekly household workflows.",
    tags: [
      "Family Ops",
      "Product Engineering",
      "Vue",
      "FastAPI",
      "Workflow Design",
    ],
    focus: "Product strategy · architecture · full-stack delivery",
    accent: "cyan",
    status: "Live product",
  },
  {
    name: "LeagueLore",
    url: "https://www.leagueloreapp.com",
    description:
      "A fantasy-football league companion for history, rankings, draft prep, and league storytelling.",
    tags: ["Fantasy Football", "Analytics", "League History", "Product Design"],
    focus: "Product design · data modeling · AI-assisted storytelling",
    accent: "violet",
    status: "League OS",
  },
  {
    name: "STPGA Scheduler",
    url: "https://stpga.davidcuellar.tech",
    description:
      "A junior-golf scheduling tool for tracking events, dates, and planning across STPGA tournament options.",
    tags: ["Junior Golf", "Scheduling", "Family Workflow", "Utility App"],
    focus: "Workflow design · schedule ingestion · planning UX",
    accent: "green",
    status: "Utility app",
  },
  {
    name: "Switchyard",
    url: "https://switchyard.davidcuellar.tech",
    description:
      "A local development command center that unifies project state, runtimes, logs, ports, resources, and agent tools.",
    tags: ["Developer Tools", "Go", "Vue", "Tauri", "MCP"],
    focus:
      "Product architecture · systems engineering · cross-platform delivery",
    accent: "blue",
    status: "Developer platform",
  },
] as const;
