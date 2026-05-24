/* =========================================================
   DEFAULT PORTFOLIO CONTENT
   All of Nitin's portfolio data, migrated from hardcoded
   page components into a structured, editable format.
   This serves as the fallback when no localStorage data exists.
========================================================= */

import type { PortfolioContent } from '@/types/content';

export const defaultContent: PortfolioContent = {
  // ─── Profile ───────────────────────────────────────
  profile: {
    name: 'Nitin Yadav',
    title: 'Full-Stack Engineer & AI Builder',
    tagline: 'Building Scalable Software & Intelligent Systems',
    bio: [
      "I'm a Computer Science Engineering student passionate about building scalable, secure, real-world software systems.",
      'My foundations include DSA, OS, DBMS, Computer Networks, and Cybersecurity, with hands-on experience in full-stack and AI-powered systems.',
      'I believe in writing code that survives production, scales with users, and solves real problems — not just demos.',
    ],
    location: 'Bhopal, India',
    email: 'ydv.nitin2401@gmail.com',
    avatarUrl: '',
    resumeUrl:
      '/resume.pdf',
    availability: 'Open to Internships & Full-Time Roles',
  },

  // ─── Hero ────────────────--------------------------
  hero: {
    headline: 'Building',
    highlightedText: 'Scalable Software',
    subheadline: '& Intelligent Systems',
    primaryCTA: {
      text: 'Explore My Work',
      action: '#projects',
      icon: 'ArrowDown',
    },
    secondaryCTA: {
      text: 'Download Resume',
      action:
        '/resume.pdf',
      icon: 'Download',
    },
    statusBadge: 'Open to Internships & Full-Time Roles',
    particleConfig: {
      density: 80,
      speed: 0.4,
      color: '#8b5cf6',
      connectionDistance: 120,
    },
  },

  // ─── Identity Cards ────────────────────────────────
  identityCards: [
    {
      id: 'id-1',
      icon: 'Code',
      title: 'Full-Stack Engineer',
      description:
        'Architecting frontend + backend systems with clean, scalable design.',
      order: 0,
    },
    {
      id: 'id-2',
      icon: 'Brain',
      title: 'AI / GenAI Builder',
      description:
        'LLMs, OpenAI APIs, Whisper, LangChain & applied AI systems.',
      order: 1,
    },
    {
      id: 'id-3',
      icon: 'Shield',
      title: 'Security-Aware Developer',
      description:
        'Ethical hacking basics, secure APIs & threat-aware design.',
      order: 2,
    },
  ],

  // ─── About ─────────────────────────────────────────
  about: {
    headline: "Hi, I'm Nitin Yadav",
    paragraphs: [
      "I'm a Computer Science Engineering student passionate about building scalable, secure, real-world software systems.",
      'My foundations include DSA, OS, DBMS, Computer Networks, and Cybersecurity, with hands-on experience in full-stack and AI-powered systems.',
    ],
    philosophy:
      'I approach software engineering as a problem-solving discipline. My focus is on clarity, scalability, and long-term maintainability. I value clean architecture, thoughtful trade-offs, and continuous learning over shortcuts and hype.',
    quickFacts: [
      { icon: 'GraduationCap', label: 'Education', value: 'B.Tech CSE' },
      { icon: 'MapPin', label: 'Location', value: 'Bhopal, India' },
      { icon: 'Calendar', label: 'Duration', value: '2023 – 2027' },
    ],
  },

  // ─── Skills ────────────────────────────────────────
  skills: [
    {
      id: 'sk-1',
      title: 'Programming Languages',
      icon: 'Code2',
      gradient: 'from-white to-zinc-400',
      items: [
        { name: 'C++', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'Java', level: 75 },
      ],
      order: 0,
    },
    {
      id: 'sk-2',
      title: 'Frontend',
      icon: 'Layout',
      gradient: 'from-zinc-400 to-zinc-200',
      items: [
        { name: 'Next.js', level: 85 },
        { name: 'React.js', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML / CSS', level: 90 },
        { name: 'Responsive Design', level: 85 },
      ],
      order: 1,
    },
    {
      id: 'sk-3',
      title: 'Backend',
      icon: 'Server',
      gradient: 'from-neutral-600 to-neutral-400',
      items: [
        { name: 'FastAPI', level: 85 },
        { name: 'Django', level: 80 },
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 90 },
        { name: 'Auth & Authorization', level: 80 },
      ],
      order: 2,
    },
    {
      id: 'sk-4',
      title: 'Databases',
      icon: 'Database',
      gradient: 'from-zinc-500 to-neutral-500',
      items: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'SQL & Query Optimization', level: 85 },
        { name: 'Supabase', level: 80 },
        { name: 'MongoDB', level: 75 },
      ],
      order: 3,
    },
    {
      id: 'sk-5',
      title: 'AI / GenAI',
      icon: 'Brain',
      gradient: 'from-white to-zinc-300',
      items: [
        { name: 'OpenAI APIs', level: 85 },
        { name: 'LangChain', level: 80 },
        { name: 'Whisper', level: 80 },
        { name: 'LLM Applications', level: 80 },
        { name: 'Prompt Engineering', level: 85 },
      ],
      order: 4,
    },
    {
      id: 'sk-6',
      title: 'DevOps & Tools',
      icon: 'Wrench',
      gradient: 'from-zinc-600 to-slate-400',
      items: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Linux', level: 75 },
        { name: 'Postman', level: 85 },
        { name: 'VS Code', level: 95 },
      ],
      order: 5,
    },
    {
      id: 'sk-7',
      title: 'Cyber Security',
      icon: 'Shield',
      gradient: 'from-neutral-500 to-zinc-400',
      items: [
        { name: 'Ethical Hacking', level: 70 },
        { name: 'Web Security', level: 75 },
        { name: 'Access Control', level: 80 },
        { name: 'Secure API Design', level: 80 },
      ],
      order: 6,
    },
  ],

  // ─── Projects ──────────────────────────────────────
  projects: [
    {
      id: 'proj-1',
      title: 'WanderGlow',
      subtitle: 'AI Powered Itinerary Planner',
      description:
        'A production-grade AI travel planner that generates personalized itineraries based on user preferences, time constraints, and locations using a scalable MERN + FastAPI architecture.',
      techStack: ['React', 'FastAPI', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
      highlights: [
        'Designed end-to-end system architecture',
        'Integrated GenAI for dynamic itinerary generation',
        'Built secure authentication & preference engine',
      ],
      githubUrl: 'https://github.com/Nydv01/wanderglow-ai-planner.git',
      liveUrl: 'https://wanderglow-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: true,
      caseStudy: {
        problem:
          'Travelers spend hours manually researching and planning trip itineraries across multiple fragmented sources.',
        solution:
          'Built an AI-powered system that generates complete, personalized day-by-day itineraries from a single set of user preferences using GenAI.',
        outcome:
          'Production-ready architecture handling complex itinerary generation with secure auth and responsive UI.',
      },
      order: 0,
    },
    {
      id: 'proj-2',
      title: 'Nexus',
      subtitle: 'Smart Campus Platform',
      description:
        'A full-stack platform designed to improve campus life with marketplaces, events, study groups, and role-based access using Supabase and PostgreSQL.',
      techStack: ['React', 'FastAPI', 'Supabase', 'PostgreSQL'],
      highlights: [
        'Role-based access control',
        'Scalable backend with Supabase',
        'Modular feature-based architecture',
      ],
      githubUrl: 'https://github.com/Nydv01/nexus-campus-app.git',
      liveUrl: 'https://nexus-campus-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: true,
      caseStudy: {
        problem:
          'Campus communities lack a unified platform for events, marketplaces, study groups, and announcements.',
        solution:
          'Created a modular full-stack platform with role-based access control and real-time features using Supabase.',
        outcome:
          'Scalable campus ecosystem supporting multiple user roles with clean architecture.',
      },
      order: 1,
    },
    {
      id: 'proj-3',
      title: 'WhisperAI',
      subtitle: 'AI Audio Transcription',
      description:
        'An AI-powered speech-to-text system using OpenAI Whisper with a clean Streamlit interface for fast and accurate transcription.',
      techStack: ['Python', 'OpenAI Whisper', 'Streamlit', 'FastAPI'],
      highlights: [
        'Integrated Whisper for accurate STT',
        'Built clean UX for non-technical users',
        'Handled multiple audio formats',
      ],
      githubUrl: 'https://github.com/Nydv01/WhisperAI_Transcriber.git',
      liveUrl: null,
      imageUrl: '',
      featured: true,
      order: 2,
    },
    {
      id: 'proj-4',
      title: 'Cognitive Agent Interface',
      subtitle: 'LangChain AI Agent',
      description:
        'Portfolio-grade interface for a LangChain cognitive agent with tool usage, memory, and reasoning capabilities.',
      techStack: ['React', 'LangChain', 'LLMs'],
      highlights: [
        'Agent with tool usage and memory',
        'Reasoning chain visualization',
        'Clean conversational interface',
      ],
      githubUrl: 'https://github.com/Nydv01/cognitive-agent-interface',
      liveUrl: null,
      imageUrl: '',
      featured: false,
      order: 3,
    },
    {
      id: 'proj-5',
      title: 'AI PDF Chatbot',
      subtitle: 'Chat with Documents',
      description:
        'Chat with PDFs using FastAPI, LangChain, vector embeddings, and OpenAI for intelligent document Q&A.',
      techStack: ['FastAPI', 'LangChain', 'OpenAI'],
      highlights: [
        'Vector embedding search',
        'Document chunking strategy',
        'Contextual Q&A responses',
      ],
      githubUrl: 'https://github.com/Nydv01/ai-pdf-chatbot-langchain',
      liveUrl: null,
      imageUrl: '',
      featured: false,
      order: 4,
    },
    {
      id: 'proj-6',
      title: 'Bhopal Bizlink',
      subtitle: 'B2B Talent Bridge & Coding Lab',
      description:
        'An ultra-premium, full-stack Next.js web application designed to bridge the gap between local MSMEs in Bhopal and top engineering talent, featuring an interactive coding lab simulator and direct recruiting.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      highlights: [
        'Designed B2B recruiting and project proposals workflow',
        'Built independent serverless local database architecture',
        'Created an interactive coding lab workspace with progress syncing',
      ],
      githubUrl: 'https://github.com/Nydv01/Bhopal-Bizlink.git',
      liveUrl: 'https://bhopal-bizlink-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: true,
      caseStudy: {
        problem:
          "Bhopal's local MSMEs struggle to recruit top local student talent, while students lack verified real-world project portfolios.",
        solution:
          'Created a premium Next.js platform that leverages the EPICS framework to list industry projects, allow student proposals, and simulate a coding workspace.',
        outcome:
          'An independent serverless web app bridging the local industry-academic gap with interactive tools.',
      },
      order: 5,
    },
    {
      id: 'proj-7',
      title: 'DripDynamics',
      subtitle: 'Cinematic Manga Fashion Store',
      description:
        'A premium, highly interactive e-commerce platform for vintage streetwear designed as a living manga storyboard with real-time web audio, stickers, and particle splash physics.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Web Audio API'],
      highlights: [
        'Built real-time synthesized audio triggers using Web Audio API',
        'Created dynamic sticker cursor and particle collision splashes',
        'Designed a cinematic multi-panel volume cover entry experience',
      ],
      githubUrl: 'https://github.com/Nydv01/vintage-drip.git',
      liveUrl: 'https://vintage-drip.vercel.app',
      imageUrl: '',
      featured: true,
      caseStudy: {
        problem:
          'Traditional e-commerce storefronts feel static, flat, and fail to engage younger streetwear demographics.',
        solution:
          'Engineered a comic-book style storefront with custom retro halftone overlays, dynamic Web Audio sound effects, and floating cursor sticker physics.',
        outcome:
          'Highly engaging, low-latency storefront that converts casual browsing into an interactive adventure.',
      },
      order: 6,
    },
    {
      id: 'proj-8',
      title: 'Distributed Traffic System',
      subtitle: 'High-Performance Routing Simulation',
      description:
        "A distributed computing simulation optimizing traffic flow across India's metropolitan regions, demonstrating the power of parallel processing and leader-follower coordinator patterns.",
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Dijkstra Algorithm'],
      highlights: [
        'Simulated concurrent data processing across 6 regional nodes',
        'Engineered resilient simulated RPC layer with exponential backoff',
        'Designed interactive map visualization with metric dashboards',
      ],
      githubUrl: 'https://github.com/Nydv01/distributed-traffic-system.git',
      liveUrl: 'https://distributed-traffic-system-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: false,
      order: 7,
    },
    {
      id: 'proj-9',
      title: 'Chemical Parameter Visualizer',
      subtitle: 'Industrial Equipment Analytics',
      description:
        'A production-ready full-stack analytics platform for processing, visualizing, and reporting chemical equipment operational parameters from CSV datasets.',
      techStack: ['React', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'CSV Parser', 'PDF Generation'],
      highlights: [
        'Implemented secure session-based authentication and user-scoped uploads',
        'Developed real-time analytics dashboards with animated charts',
        'Built professional PDF report generation and download service',
      ],
      githubUrl: 'https://github.com/Nydv01/chemviz-analytics.git',
      liveUrl: 'https://chemviz-analytics-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: false,
      order: 8,
    },
    {
      id: 'proj-10',
      title: 'Discord Copilot Admin',
      subtitle: 'Real-Time AI Bot Management Panel',
      description:
        'A full-stack configuration and health-monitoring panel for an AI-powered Discord bot, enabling live instruction updates, channel allowlisting, and automated memory resets.',
      techStack: ['React', 'TypeScript', 'Supabase', 'Node.js', 'discord.js', 'OpenAI API'],
      highlights: [
        'Designed zero-redeploy live instruction updates using Supabase sync',
        'Built WebSocket status trackers and bot health heartbeats panel',
        'Enforced secure admin-only authentication and permission gates',
      ],
      githubUrl: 'https://github.com/Nydv01/discord-copilot-admin.git',
      liveUrl: 'https://discord-copilot-admin-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: false,
      order: 9,
    },
    {
      id: 'proj-11',
      title: 'FOSSEE Socratic Tutor',
      subtitle: 'AI Code Pedagogical Feedback',
      description:
        'An AI-powered Socratic tutoring system that analyzes Python code submissions to provide interactive, pedagogical feedback without revealing direct solutions.',
      techStack: ['Python', 'OpenAI API', 'FastAPI', 'Socratic Prompting'],
      highlights: [
        'Built deep AST (Abstract Syntax Tree) code flow analysis',
        'Engineered strict LLM prompting boundaries for pedagogical guidance',
        'Created detailed diagnostic logs for tutoring iterations',
      ],
      githubUrl: 'https://github.com/Nydv01/fossee-python-evaluation.git',
      liveUrl: 'https://fossee-tutor-nitins-projects-9d8e7e6a.vercel.app',
      imageUrl: '',
      featured: false,
      order: 10,
    },
  ],

  // ─── Timeline ──────────────────────────────────────
  timeline: [
    {
      id: 'tl-1',
      year: '2023 – 2027',
      title: 'B.Tech in Computer Science Engineering',
      institution: 'VIT Bhopal University',
      description:
        'Pursuing B.Tech in CSE (Core) with a current CGPA of 8.83/10.0. Focused on core computer science fundamentals, software engineering, system design, and problem-solving.',
      icon: 'GraduationCap',
      order: 0,
    },
    {
      id: 'tl-2',
      year: '2023',
      title: 'Programming Foundations',
      description:
        'Built strong fundamentals in C++ and Python with Data Structures & Algorithms.',
      icon: 'Code',
      order: 1,
    },
    {
      id: 'tl-3',
      year: '2024',
      title: 'Full-Stack Development',
      description:
        'Developed scalable applications using React, FastAPI, Node.js, and modern backend architectures.',
      icon: 'Layers',
      order: 2,
    },
    {
      id: 'tl-4',
      year: '2024',
      title: 'AI & Generative Systems',
      description:
        'Worked with LLMs, speech models, and AI APIs to build intelligent, production-grade tools.',
      icon: 'Brain',
      order: 3,
    },
    {
      id: 'tl-5',
      year: '2025',
      title: 'Ethical Hacking & Cybersecurity',
      description:
        'Learned ethical hacking concepts, system vulnerabilities, threat models, and secure application practices.',
      icon: 'Shield',
      order: 4,
    },
    {
      id: 'tl-6',
      year: 'Nov 2025 – Jan 2026',
      title: 'Software Engineering Intern',
      institution: 'Frigoglass India Pvt. Ltd.',
      description:
        'Contributed to the Technical Department (CSE/IT) on key projects including the Smart Campus Platform (Nexus). Developed backend services using Python & Django, performed database schema and query optimizations with SQL, and integrated frontend UI components. Evaluated performance was rated excellent with a strong foundation in CSE principles.',
      icon: 'Briefcase',
      linkUrl: 'https://drive.google.com/file/d/16J4bQbQWaQ0bR0VZvgZFR4OvAbUi3mi2/view?usp=sharing',
      order: 5,
    },
    {
      id: 'tl-7',
      year: '2024',
      title: 'Event Management Team Member',
      institution: 'Data Science Club (DSC)',
      description:
        'Co-organized campus-wide technical events and workshops, managing operations, logistics, and participant outreach.',
      icon: 'Users',
      order: 6,
    },
  ],

  // ─── Certifications ────────────────────────────────
  certifications: [
    {
      id: 'cert-1',
      title: 'Google Cybersecurity Professional Certificate',
      issuer: 'Google · Coursera',
      year: '2025',
      description:
        'Industry-recognized program covering security operations, network security, Linux, risk management, and incident response.',
      highlights: [
        'Security operations & SIEM basics',
        'Threats, vulnerabilities & risk mitigation',
        'Linux & SQL for security tasks',
      ],
      skills: [
        'Security Operations',
        'Incident Response',
        'Risk Management',
        'Network Security',
      ],
      verifyUrl:
        'https://www.linkedin.com/in/ydv-nitin/details/certifications/',
      order: 0,
    },
    {
      id: 'cert-2',
      title: 'Industrial IoT Markets & Security',
      issuer: 'Coursera',
      year: '2025',
      description:
        'Focused on Industrial IoT ecosystems, attack surfaces, and security challenges in connected systems.',
      highlights: [
        'IIoT architectures',
        'Security challenges in smart systems',
        'Risk-aware system design',
      ],
      skills: ['IoT Security', 'Threat Modeling', 'Secure Architecture'],
      order: 1,
    },
    {
      id: 'cert-3',
      title: 'Google Generative AI Certification',
      issuer: 'SmartBridge · Google',
      year: '2025',
      description:
        'Hands-on certification focused on Generative AI concepts, LLM usage, prompt design, and real-world AI applications.',
      highlights: [
        'GenAI fundamentals',
        'LLM-powered application design',
        'Responsible AI practices',
      ],
      skills: [
        'Generative AI',
        'Prompt Engineering',
        'LLM Applications',
        'Responsible AI',
      ],
      order: 2,
    },
  ],

  // ─── Achievements ──────────────────────────────────
  achievements: [
    {
      id: 'ach-1',
      title: '6+',
      description: 'Production-Level Projects',
      icon: 'Code',
      order: 0,
    },
    {
      id: 'ach-2',
      title: '3+',
      description: 'Professional Certifications',
      icon: 'Award',
      order: 1,
    },
    {
      id: 'ach-3',
      title: '7+',
      description: 'GitHub Repositories',
      icon: 'GitBranch',
      order: 2,
    },
    {
      id: 'ach-4',
      title: '5+',
      description: 'Credly Skill Badges',
      icon: 'BadgeCheck',
      order: 3,
    },
  ],

  // ─── Testimonials ──────────────────────────────────
  testimonials: [],

  // ─── Social Links ──────────────────────────────────
  socialLinks: [
    {
      id: 'soc-1',
      platform: 'GitHub',
      url: 'https://github.com/Nydv01',
      icon: 'Github',
      label: 'GitHub',
      order: 0,
    },
    {
      id: 'soc-2',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/ydv-nitin',
      icon: 'Linkedin',
      label: 'LinkedIn',
      order: 1,
    },
    {
      id: 'soc-3',
      platform: 'Email',
      url: 'mailto:ydv.nitin2401@gmail.com',
      icon: 'Mail',
      label: 'Email',
      order: 2,
    },
  ],

  // ─── Contact ───────────────────────────────────────
  contact: {
    headline: 'Ready to Build Something Real?',
    subheadline:
      "I'm actively looking for internships, placements, and impactful engineering roles. If you're hiring or collaborating, let's talk.",
    email: 'ydv.nitin2401@gmail.com',
    calendlyUrl: 'https://calendly.com/ydv-nitin2401/30min',
    showForm: true,
    formFields: ['name', 'email', 'message'],
  },

  // ─── AI Config ─────────────────────────────────────
  ai: {
    enabled: true,
    assistantName: 'NEXUS AI',
    starterPrompts: [
      "What are Nitin's key skills?",
      'Tell me about his projects',
      'Is he available for hire?',
      'What certifications does he have?',
    ],
    customKnowledge: [],
    systemPromptAdditions: '',
    maxMessagesPerSession: 20,
  },

  // ─── Theme ─────────────────────────────────────────
  theme: {
    primaryHue: 250,
    accentHue: 185,
    enabledSections: [
      'hero',
      'identity',
      'about',
      'skills',
      'projects',
      'timeline',
      'achievements',
      'contact',
    ],
    sectionOrder: [
      'hero',
      'identity',
      'about',
      'skills',
      'projects',
      'timeline',
      'achievements',
      'contact',
    ],
  },

  // ─── SEO ───────────────────────────────────────────
  seo: {
    title: 'Nitin Yadav — Full-Stack Engineer & AI Builder',
    description:
      'Computer Science Engineer focused on full-stack development, GenAI, backend systems, and security-aware engineering. Open to internships and full-time roles.',
    ogImage: '',
    keywords: [
      'Nitin Yadav',
      'Full-Stack Developer',
      'AI Engineer',
      'React',
      'FastAPI',
      'Portfolio',
      'Software Engineer',
    ],
    url: 'https://nitin-yadav.vercel.app',
  },
};
