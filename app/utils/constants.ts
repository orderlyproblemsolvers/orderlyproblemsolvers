export const SOLUTION_CATEGORIES = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'AgriTech',
  'GovTech',
  'ClimateTech',
  'PropTech',
  'Logistics & Mobility',
  'E-Commerce & Retail Tech',
  'AI & Data',
  'Cybersecurity',
  'Cloud & DevOps',
  'Media & Creator Tech',
  'HR & Future of Work',
  'Sales & Marketing Tech',
  'Payments & Infrastructure',
  'Blockchain & Web3',
  'Smart Cities & IoT',
  'Enterprise Software',
  'Social Impact & Non-Profit Tech'
] as const;

export type SolutionCategory = typeof SOLUTION_CATEGORIES[number];