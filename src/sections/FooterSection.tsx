import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, LucideIcon, ArrowUp } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
};

export default function FooterSection() {
  const { content } = useContentStore();
  const { profile, socialLinks } = content;
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 pt-20 pb-10 overflow-hidden bg-[hsl(225,15%,3%)]">
      {/* Top Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <h3 className="font-display text-2xl font-bold tracking-tight mb-4 text-white/90">
              <span className="gradient-text">Nitin</span> Yadav
            </h3>
            <p className="text-white/50 leading-relaxed mb-6 max-w-sm">
              {profile.tagline}. {profile.availability}.
            </p>
            <a href={`mailto:${profile.email}`} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              {profile.email}
            </a>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 lg:col-span-4 md:mx-auto">
            <h4 className="text-white/80 font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-3">
              {['about', 'skills', 'projects', 'contact'].map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => scrollTo(section)}
                    className="text-white/40 hover:text-white transition-colors capitalize text-sm"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal Column */}
          <div className="md:col-span-4 lg:col-span-4 md:text-right flex flex-col md:items-end">
            <h4 className="text-white/80 font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || Mail;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
            <button 
              onClick={() => scrollTo('top')}
              className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-sm group mt-auto"
            >
              Back to top 
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-violet-500">♥</span> and React
          </p>
        </div>
      </div>
    </footer>
  );
}
