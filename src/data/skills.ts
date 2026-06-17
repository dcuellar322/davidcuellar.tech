export const skillGroups = [
  {
    name: "Product Engineering",
    description: "Product surfaces, APIs, and typed front-end systems.",
    skills: ["Vue", "React", "TypeScript", "FastAPI", "Python", "Java"],
    accent: "cyan",
  },
  {
    name: "Platform & Delivery",
    description: "Delivery pipelines, runtime infrastructure, and release discipline.",
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Helm", "GitLab", "GitHub"],
    accent: "green",
  },
  {
    name: "Data & Systems",
    description: "Operational data, governance, event streams, and durable storage.",
    skills: ["PostgreSQL", "Snowflake", "Kafka", "Oracle PL/SQL", "Data Governance", "MDM"],
    accent: "violet",
  },
  {
    name: "Engineering Leadership",
    description: "Technical clarity, delivery planning, coaching, and quality systems.",
    skills: ["Architecture", "Code Review", "Documentation", "Coaching", "Delivery Planning", "Testing Strategy"],
    accent: "amber",
  },
] as const;
