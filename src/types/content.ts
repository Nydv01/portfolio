/* =========================================================
   PORTFOLIO CONTENT TYPE SYSTEM
   Central type definitions for the entire portfolio.
   All content flows through these types.
========================================================= */

// ─── Profile ───────────────────────────────────────────
export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
  availability: string;
}

// ─── Hero Configuration ────────────────────────────────
export interface HeroConfig {
  headline: string;
  highlightedText: string;
  subheadline: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
  statusBadge: string;
  particleConfig: ParticleConfig;
}

export interface CTAButton {
  text: string;
  action: string; // URL or section ID (e.g., "#projects")
  icon?: string;
}

export interface ParticleConfig {
  density: number;
  speed: number;
  color: string;
  connectionDistance: number;
}

// ─── Identity Cards ────────────────────────────────────
export interface IdentityCard {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
  order: number;
}

// ─── About ─────────────────────────────────────────────
export interface AboutData {
  headline: string;
  paragraphs: string[];
  philosophy: string;
  quickFacts: QuickFact[];
}

export interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

// ─── Skills ────────────────────────────────────────────
export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  items: SkillItem[];
  order: number;
}

export interface SkillItem {
  name: string;
  level: number; // 0–100
}

// ─── Projects ──────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl: string | null;
  imageUrl: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  order: number;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  outcome: string;
}

// ─── Timeline ──────────────────────────────────────────
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  institution?: string;
  description: string;
  icon?: string;
  linkUrl?: string;
  order: number;
}

// ─── Certifications ────────────────────────────────────
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  highlights: string[];
  skills: string[];
  credlyUrl?: string;
  verifyUrl?: string;
  order: number;
}

// ─── Achievements ──────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  value?: string;
  icon?: string;
  order: number;
}

// ─── Testimonials ──────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl?: string;
  order: number;
}

// ─── Social Links ──────────────────────────────────────
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string; // lucide icon name
  label: string;
  order: number;
}

// ─── Contact Config ────────────────────────────────────
export interface ContactConfig {
  headline: string;
  subheadline: string;
  email: string;
  calendlyUrl: string;
  showForm: boolean;
  formFields: string[];
}

// ─── AI Config ─────────────────────────────────────────
export interface AIConfig {
  enabled: boolean;
  assistantName: string;
  starterPrompts: string[];
  customKnowledge: string[];
  systemPromptAdditions: string;
  maxMessagesPerSession: number;
}

// ─── Theme Config ──────────────────────────────────────
export interface ThemeConfig {
  primaryHue: number;
  accentHue: number;
  enabledSections: string[];
  sectionOrder: string[];
}

// ─── SEO Config ────────────────────────────────────────
export interface SEOConfig {
  title: string;
  description: string;
  ogImage: string;
  keywords: string[];
  url: string;
}

// ─── Root Content Object ───────────────────────────────
export interface PortfolioContent {
  profile: ProfileData;
  hero: HeroConfig;
  identityCards: IdentityCard[];
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  timeline: TimelineEvent[];
  certifications: Certification[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  contact: ContactConfig;
  ai: AIConfig;
  theme: ThemeConfig;
  seo: SEOConfig;
}
