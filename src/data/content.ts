export const profile = {
  name: 'Vineet Joshi',
  title: 'AI Fullstack Engineer',
  tagline:
    'I design and ship production Generative AI systems — RAG pipelines, agentic workflows, and secure backends that hold up in the real world.',
  email: 'joshivineet229@gmail.com',
  phone: '+91-7253072003',
  phoneHref: 'tel:+917253072003',
  location: 'Gurugram, India',
  summary:
    'AI Fullstack Engineer with 1+ year of experience building production-ready Generative AI and backend systems using RAG, LangChain, LangGraph, and MCP. Delivered 5+ enterprise-grade applications that improved system performance, security, and automation by 25–45%, from system design through deployment.',
  socials: [
    { label: 'Email', href: 'mailto:joshivineet229@gmail.com' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vineet-joshi-034325281',
    },
  ],
}

export const skills = [
  {
    category: 'LLM & Generative AI',
    items: [
      'RAG',
      'Prompt Engineering',
      'LangChain',
      'LangGraph',
      'Agentic AI',
      'MCP',
      'Vector Databases',
      'AWS Bedrock',
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      'Python',
      'Java',
      'JavaScript',
      'FastAPI',
      'Django',
      'Spring Boot',
      'REST',
      'Microservices',
    ],
  },
  {
    category: 'Data & Cloud',
    items: [
      'MySQL',
      'MongoDB',
      'SQLite',
      'ChromaDB',
      'AWS Lambda',
      'Serverless',
    ],
  },
  {
    category: 'Security & Delivery',
    items: [
      'RBAC',
      'JWT',
      'OAuth2',
      'LLM Guardrails',
      'Git',
      'CI/CD',
      'Agile',
    ],
  },
]

export const experience = [
  {
    role: 'AI Fullstack Intern',
    period: 'Apr 2026 – Sep 2026',
    focus: 'Industrial AI · Predictive Maintenance · RAG Diagnostics',
    highlights: [
      'Built and deployed a production Industrial AI predictive maintenance platform with real-time PLC monitoring, anomaly detection, root-cause analysis, and AI diagnostics across 20+ machines — cutting unplanned downtime by 25%.',
      'Engineered a low-latency multi-PLC monitoring engine processing 1,000+ signals per second with sub-second health analytics.',
      'Implemented explainable anomaly detection with cycle-time intelligence and baseline profiling — +30% fault detection accuracy, −20% false positives.',
      'Built a ladder-logic-aware root-cause engine tracing fault propagation through PLC dependency graphs — 40% faster diagnostics.',
      'Integrated RAG diagnostics over live telemetry, manuals, and historical faults — 35% lower mean-time-to-resolution.',
      'Owned the full product lifecycle from system design to a one-click Industrial IoT deployment used by 10+ factory-floor engineers.',
    ],
  },
  {
    role: 'Generative AI Trainee',
    period: 'Jul 2025 – Feb 2026',
    focus: 'Agents · MCP · LLM Guardrails · Enterprise Auth',
    highlights: [
      'Developed and deployed 15+ custom LangChain tools automating retrieval and decision workflows across 5+ internal systems — +40% LLM application capability.',
      'Configured LLM guardrails that blocked prompt injection and cut unsafe outputs by 95% across 10+ production endpoints.',
      'Implemented RBAC with JWT/OAuth2 for 3+ enterprise apps — full compliance and 95% fewer unauthorized access attempts.',
      'Designed and shipped 8+ Model Context Protocol (MCP) servers exposing internal tools and APIs to LLM agents — +45% tool reuse.',
      'Wired MCP servers into LangChain- and Bedrock-powered agents for dynamic tool discovery — 30% faster delivery across 4+ projects.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    period: 'Jan 2024 – Mar 2024',
    focus: 'APIs · Databases · Performance',
    highlights: [
      'Engineered 12+ RESTful APIs with Django supporting 1,000+ active users with secure auth and real-time updates.',
      'Architected MongoDB storage for 50,000+ records with reliable high-performance retrieval.',
      'Refactored 2,500+ lines and added caching — 35% faster API responses.',
      'Partnered with a 4-person frontend team to integrate APIs and ship features 20% faster.',
    ],
  },
]

export const impact = [
  {
    metric: '25–45%',
    label: 'Gains in performance, security & automation across shipped systems',
  },
  {
    metric: '5+',
    label: 'Enterprise-grade AI and backend applications delivered end-to-end',
  },
  {
    metric: '95%',
    label: 'Reduction in unsafe LLM outputs via production guardrails',
  },
  {
    metric: '1,000+',
    label: 'Signals/sec processed in real-time industrial monitoring',
  },
]

export const education = [
  {
    school: 'Birla Institute of Applied Sciences, Bhimtal',
    credential: 'Bachelor of Technology',
    year: '2025',
    detail: '80%',
  },
  {
    school: 'Lakes International School, Bhimtal',
    credential: 'Intermediate',
    year: '2021',
    detail: '89.6%',
  },
  {
    school: 'Lakes International School, Bhimtal',
    credential: 'High School',
    year: '2019',
    detail: '94.6%',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]
