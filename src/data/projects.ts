export const projects = [
  {
    name: "Family Hub",
    url: "https://www.thefamilyhub.app",
    description:
      "A home-operations app for family calendars, chores, todos, meals, weather, and weekly household workflows.",
    tags: ["Family Ops", "Product Engineering", "Vue", "FastAPI", "Workflow Design"],
    accent: "cyan",
    status: "Live product",
  },
  {
    name: "LeagueLore",
    url: "https://www.leagueloreapp.com",
    description:
      "A fantasy-football league companion for history, rankings, draft prep, and league storytelling.",
    tags: ["Fantasy Football", "Analytics", "League History", "Product Design"],
    accent: "violet",
    status: "League OS",
    note: "Verify spelling of the LeagueLore domain before launch.",
  },
  {
    name: "STPGA Scheduler",
    url: "https://stpga.davidcuellar.tech",
    description:
      "A junior-golf scheduling tool for tracking events, dates, and planning across STPGA tournament options.",
    tags: ["Junior Golf", "Scheduling", "Family Workflow", "Utility App"],
    accent: "green",
    status: "Utility app",
  },
] as const;
