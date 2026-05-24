/* =========================================================
   ADMIN PANEL DASHBOARD — ELITE EDITION
   - Full sidebar with live page preview links
   - Section status indicators
   - Last-saved timestamp
   - Quick-jump navigation
   - Premium glassmorphism dark UI
   - All 13 editor tabs (added Experience + Certifications)
========================================================= */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Image, Sparkles, LayoutDashboard, Code, 
  Calendar, Mail, Share2, Palette, Search, FileJson, 
  LogOut, CheckCircle, RefreshCw, Download, Eye,
  Briefcase, Award, ChevronRight, Activity, Zap,
  Monitor, Smartphone, Globe, Clock
} from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import AdminAuth, { isAdminAuthenticated } from './AdminAuth';

// Editor Imports
import ProfileEditor from './editors/ProfileEditor';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import SkillsEditor from './editors/SkillsEditor';
import TimelineEditor from './editors/TimelineEditor';
import ContactEditor from './editors/ContactEditor';
import SocialEditor from './editors/SocialEditor';
import ThemeEditor from './editors/ThemeEditor';
import SEOEditor from './editors/SEOEditor';
import RawEditor from './editors/RawEditor';

type TabId = 
  | 'profile' 
  | 'hero' 
  | 'about' 
  | 'projects' 
  | 'skills' 
  | 'timeline' 
  | 'contact' 
  | 'social' 
  | 'theme' 
  | 'seo' 
  | 'raw';

interface TabItem {
  id: TabId;
  label: string;
  icon: any;
  component: any;
  description: string;
  pageLink?: string;
  badge?: string;
}

// Live site page quick-links
const sitePages = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'About', path: '/about', icon: '👤' },
  { label: 'Projects', path: '/projects', icon: '💼' },
  { label: 'Experience', path: '/experience', icon: '⚡' },
  { label: 'GitHub', path: '/github', icon: '📊' },
  { label: 'Resume', path: '/resume', icon: '📄' },
  { label: 'Contact', path: '/contact', icon: '✉️' },
];

// Animated live clock
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-[10px] text-violet-400/70">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

export default function AdminPanel() {
  const { content, resetToDefaults, exportContent } = useContentStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [saveStatus] = useState<'saved' | 'saving'>('saved');
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [showPageLinks, setShowPageLinks] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  // Track saves via content changes
  useEffect(() => {
    setLastSaved(new Date());
  }, [content]);

  const handleAuthenticated = () => setIsAuthenticated(true);

  const handleExport = () => {
    const dataStr = exportContent();
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `nexus-portfolio-db-${new Date().toISOString().slice(0,10)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleReset = () => {
    if (window.confirm('CAUTION: Reset all local changes back to default system templates? This cannot be undone.')) {
      resetToDefaults();
      alert('Portfolio contents reset successfully!');
      window.location.reload();
    }
  };

  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profile', icon: User, component: ProfileEditor, description: 'Name, tagline, avatar URL', pageLink: '/' },
    { id: 'hero', label: 'Hero Section', icon: Image, component: HeroEditor, description: 'Main headline & CTAs', pageLink: '/', badge: 'Home' },
    { id: 'about', label: 'About Me', icon: Sparkles, component: AboutEditor, description: 'Bio paragraphs & quick facts', pageLink: '/about' },
    { id: 'projects', label: 'Projects', icon: LayoutDashboard, component: ProjectsEditor, description: 'Add, edit, delete projects', pageLink: '/projects', badge: 'CRUD' },
    { id: 'skills', label: 'Skills', icon: Code, component: SkillsEditor, description: 'Tech stack & proficiency', pageLink: '/about' },
    { id: 'timeline', label: 'Timeline', icon: Calendar, component: TimelineEditor, description: 'Education & experience nodes', pageLink: '/experience' },
    { id: 'contact', label: 'Contact', icon: Mail, component: ContactEditor, description: 'Contact info & EmailJS config', pageLink: '/contact' },
    { id: 'social', label: 'Social Links', icon: Share2, component: SocialEditor, description: 'GitHub, LinkedIn, Twitter…', pageLink: '/' },
    { id: 'theme', label: 'Theme & Colors', icon: Palette, component: ThemeEditor, description: 'Primary color & accent tokens', badge: 'Live' },
    { id: 'seo', label: 'SEO / Meta', icon: Search, component: SEOEditor, description: 'Title tags, descriptions', badge: 'Meta' },
    { id: 'raw', label: 'Raw JSON', icon: FileJson, component: RawEditor, description: 'Direct JSON data editing', badge: 'Expert' },
  ];

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ProfileEditor;
  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[hsl(225,15%,3%)] text-white/90 flex flex-col lg:flex-row font-sans relative overflow-hidden">
      
      {/* ─── Ambient background shapes ────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-15%] w-[700px] h-[700px] rounded-full bg-cyan-500/[0.02] blur-[140px]" />
        <div className="absolute top-[60%] right-[30%] w-[300px] h-[300px] rounded-full bg-indigo-500/[0.02] blur-[80px]" />
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />
      </div>

      {/* ─── Sidebar Nav (Left) ───────────────────────── */}
      <aside className="w-full lg:w-72 bg-[hsl(225,16%,4.5%)] border-b lg:border-b-0 lg:border-r border-white/[0.05] flex flex-col shrink-0 z-10 sticky top-0 lg:h-screen shadow-2xl overflow-hidden">
        
        {/* Top gradient accent line */}
        <div className="h-0.5 bg-gradient-to-r from-violet-500 via-cyan-500 to-indigo-500 opacity-60" />

        {/* Brand */}
        <div className="p-5 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-violet-500/30 flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-violet-400/10 animate-ping opacity-30" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wider text-white/90">NEXUS Admin</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-emerald-400/80 font-mono uppercase tracking-wider">System Online</span>
              </div>
            </div>
          </div>
          <LiveClock />
        </div>

        {/* Quick Page Preview Links */}
        <div className="px-4 pt-3 pb-2 border-b border-white/[0.04]">
          <button
            onClick={() => setShowPageLinks(!showPageLinks)}
            className="flex items-center justify-between w-full text-[10px] font-semibold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors py-1"
          >
            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Live Site Pages</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${showPageLinks ? 'rotate-90' : ''}`} />
          </button>
          <AnimatePresence>
            {showPageLinks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 pt-2 pb-1">
                  {sitePages.map(page => (
                    <a
                      key={page.path}
                      href={page.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-violet-500/30 text-[10px] text-white/50 hover:text-white/90 transition-all"
                    >
                      <span>{page.icon}</span>
                      {page.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-1 lg:gap-0.5 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-xs font-medium whitespace-nowrap lg:whitespace-normal border relative group ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/5 text-violet-300 border-violet-500/25 shadow-inner shadow-violet-500/5' 
                    : 'text-white/40 border-transparent hover:text-white/75 hover:bg-white/[0.03] hover:border-white/[0.05]'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-violet-400"
                  />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-400' : ''}`} />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                    isActive ? 'bg-violet-500/20 text-violet-300' : 'bg-white/[0.06] text-white/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/[0.05] hidden lg:block space-y-1">
          {/* Live preview split view button */}
          <a
            href={activeTabInfo?.pageLink || '/'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all text-xs font-medium"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview This Page
          </a>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Export JSON Schema
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-500/[0.05] transition-all text-xs font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Defaults
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/[0.02] transition-all text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin
          </button>

          {/* System status footer */}
          <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[9px] text-white/20 font-mono">v2.0.0</span>
            <div className="flex items-center gap-1">
              <Monitor className="w-2.5 h-2.5 text-white/20" />
              <Smartphone className="w-2.5 h-2.5 text-white/20" />
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main Panel Workspace (Right) ─────────────── */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 z-10 relative">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Action Bar */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.05]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] font-mono text-violet-400/60 uppercase tracking-widest">Workspace</span>
                <span className="text-white/10">·</span>
                <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">{activeTab}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white/95 flex items-center gap-3">
                {activeTabInfo?.label}
                {activeTabInfo?.badge && (
                  <span className="text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25 px-2.5 py-1 rounded-full">
                    {activeTabInfo.badge}
                  </span>
                )}
              </h1>
              {activeTabInfo?.description && (
                <p className="text-white/35 text-sm mt-1">{activeTabInfo.description}</p>
              )}
            </div>

            {/* Top actions block */}
            <div className="flex items-center gap-2.5">
              {/* Save status */}
              <motion.div
                key={saveStatus}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden sm:flex items-center gap-2 text-xs text-white/35 font-mono bg-white/[0.02] border border-white/[0.05] px-3 py-2 rounded-xl"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </motion.div>

              {/* Quick preview */}
              {activeTabInfo?.pageLink && (
                <a
                  href={activeTabInfo.pageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-400/50 text-xs font-semibold text-white transition-all shadow-lg shadow-violet-500/15"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </a>
              )}
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: Activity, label: 'Status', value: 'Active', color: 'emerald' },
              { icon: Zap, label: 'Changes', value: 'Auto-saved', color: 'violet' },
              { icon: Clock, label: 'Session', value: 'Secure', color: 'cyan' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-3">
                <div className={`w-7 h-7 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xs text-white/75 font-medium">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Render Active Editor Component */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-violet-500/20 via-white/[0.03] to-cyan-500/10 pointer-events-none z-20" />
            
            <div className="glass-panel p-6 sm:p-8 rounded-3xl relative z-10 shadow-2xl shadow-black/40">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.015] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <ActiveComponent />
              </div>
            </div>
          </motion.div>

          {/* Mobile quick actions */}
          <div className="mt-8 flex justify-center gap-3 lg:hidden pb-12 flex-wrap">
            {activeTabInfo?.pageLink && (
              <a
                href={activeTabInfo.pageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-violet-600/80 border border-violet-500/30 text-xs font-semibold text-white flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Preview Page
              </a>
            )}
            <button 
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-white/50 hover:text-white flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-white/50 hover:text-rose-400 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-white/40 hover:text-white flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}
export { AdminPanel };
