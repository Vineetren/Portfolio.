const resumeUrl =
  'https://drive.google.com/file/d/1cMnRWreq7c_usZPFLT37_PTSsmMkDszJ/view?usp=drive_link'

export const profile = {
  name: 'Vineet Joshi',
  portrait: '/portrait.png',
  portraitAlt: 'Portrait of Vineet Joshi',
  title: 'AI Engineer',
  tagline:
    'I ship production AI end to end—agentic systems, RAG, and backends built to scale.',
  heroQuote: 'The best way to predict the future is to build it.',
  email: 'joshivineet229@gmail.com',
  phone: '+91-7253072003',
  phoneHref: 'tel:+917253072003',
  resumeUrl,
  summary:
    'AI Fullstack Engineer with 1+ year of experience building production-ready Generative AI and backend systems using RAG, LangChain, LangGraph, and MCP. Delivered 5+ enterprise-grade applications that improved system performance, security, and automation by 25–45%, from system design through deployment.',
  socials: [
    { label: 'Email', href: 'mailto:joshivineet229@gmail.com' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vineet-joshi-034325281',
    },
    { label: 'Resume', href: resumeUrl },
  ],
}

export const heroHudStack = [
  'RAG',
  'LANGCHAIN',
  'LANGGRAPH',
  'MCP',
  'PYTHON',
  'JAVA',
  'AWS',
]

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

export const agentSection = {
  eyebrow: 'Agent',
  title: 'Your cyber workspace companion.',
  lead:
    'A live 3D agent in the stack — orbit the model, hover to wave, and explore how I think about interactive AI surfaces.',
  copy:
    'I treat agents as product surfaces: grounded tools, clear status, and motion that signals when the system is listening. This demo runs the same WebGL pipeline I use for immersive portfolio and assistant UIs.',
  capabilities: [
    'Mixamo-driven idle & wave animations',
    'Cyber material pass on the mesh',
    'Orbit controls with camera fit to visible geometry',
    'Lazy-loaded when you scroll here',
  ],
  hint: 'Drag to rotate · Hover or tap the viewport to engage',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Agent', href: '#agent' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
