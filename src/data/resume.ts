export const experience = [
  {
    company: "USAA",
    location: "San Antonio, TX",
    roles: ["Software Engineer Lead", "Software Engineer Senior"],
    summary:
      "Technical lead for bank operations digital delivery, compliance-sensitive workflows, automated testing, documentation, code reviews, and production releases.",
    highlights: [
      "Led highly critical issue-management and collections features against compliance deadlines.",
      "Helped deliver one-way outbound collection email workflows across a multi-team initiative.",
      "Led an MVP fraud transaction history UI/API solution for a critical compliance finding, then helped redesign the backend query solution quickly.",
    ],
    tags: ["Java", "APIs", "Testing", "Compliance", "Production Delivery", "Leadership"],
    tone: "blue",
  },
  {
    company: "VantagePoint / JunglePilot",
    location: "",
    roles: ["Independent Software Consultant"],
    summary:
      "Consulted on cloud-agent automation, Python codebases, Kubernetes autoscaling, and one-click customer environment provisioning.",
    highlights: [
      "Top-2 GitHub contributor in the ThreatKB Python codebase by InQuest.",
      "Implemented Kubernetes autoscaling for cloud agents based on queue size.",
      "Integrated signup flow with one-click environment provisioning via Helm charts.",
    ],
    tags: ["Python", "Kubernetes", "Helm", "Azure", "Automation"],
    tone: "green",
  },
  {
    company: "Netspend / TSYS",
    location: "",
    roles: ["Solutions Architect", "Senior Software Engineer", "Software Engineer II"],
    summary:
      "Technical lead in internal operations across MDM, ETL, data governance, Java services, Kafka, Snowflake, React, and database release automation.",
    highlights: [
      "Expanded TIBCO EBX MDM application with custom REST APIs and React UIs.",
      "Spoke at MDM/Data Governance conferences and TIBCO Now.",
      "Drove SDLC standardization and database release automation.",
    ],
    tags: ["Java", "React", "Kafka", "Snowflake", "Oracle PL/SQL", "MDM", "Data Governance"],
    tone: "violet",
  },
  {
    company: "Hewlett-Packard",
    location: "",
    roles: ["Product Owner", "IT Developer/Engineer"],
    summary:
      "Product owner, ScrumMaster, and lead developer for financial claims and product content systems.",
    highlights: [
      "Built automation scripts and Puppet modules for CI server setup.",
      "Co-authored Java API used by HP.com to retrieve product content across locales.",
      "Built .NET, Java, and PL/SQL solutions integrating content and digital assets.",
    ],
    tags: ["Java", ".NET", "Oracle", "Puppet", "CI", "Scrum"],
    tone: "amber",
  },
] as const;

export const education = {
  school: "University of Texas at Austin",
  degree: "Bachelor of Science in Mathematics",
  specialization: "Scientific Computation",
  minor: "Computer Science",
};
