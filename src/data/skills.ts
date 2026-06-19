export const skillGroups = [
  {
    name: "Product Engineering",
    description: "Product surfaces, APIs, and typed front-end systems.",
    skills: ["Python", "FastAPI", "Vue", "React", "TypeScript", "Java"],
    accent: "cyan",
  },
  {
    name: "Platform & Delivery",
    description: "Delivery pipelines, runtime infrastructure, and release discipline.",
    skills: ["GitLab", "Docker", "CI/CD", "HashiCorp Nomad", "MinIO/S3", "Kubernetes", "Helm"],
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
    skills: ["Engineering Strategy", "Architecture", "Code Review", "Mentorship", "Delivery Planning", "Testing Strategy"],
    accent: "amber",
  },
] as const;
