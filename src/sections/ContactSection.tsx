/* =========================================================
   CONTACT SECTION — "Let's Connect"
   Rebuilds the contact page into a world-class, premium landing.
   Uses EmailJS for direct secure mailing, has Calendly integrations,
   and features GlowCards and MagneticButton submit interactions.
========================================================= */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageSquare, Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Mail, LucideIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import GlowCard from '@/components/effects/GlowCard';
import MagneticButton from '@/components/effects/MagneticButton';
import { fadeUp, easings } from '@/lib/animations';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
};

export default function ContactSection() {
  const { content } = useContentStore();
  const { contact, socialLinks } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.showForm) return;

    setFormState('loading');
    
    try {
      const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
      const ADMIN_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !ADMIN_TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('Missing EmailJS configuration');
      }

      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      // Try auto-reply if template is configured
      const AUTO_REPLY_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
      if (AUTO_REPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            SERVICE_ID,
            AUTO_REPLY_TEMPLATE_ID,
            {
              to_name: formData.name,
              send_to: formData.email,
            },
            PUBLIC_KEY
          );
        } catch (autoErr) {
          console.warn('Auto-reply failed', autoErr);
        }
      }

      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding container-custom relative z-10">
      
      {/* Header */}
      <motion.div 
        className="mb-16 text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-3 h-[1px] bg-violet-500" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">Get In Touch</span>
          <div className="w-3 h-[1px] bg-violet-500" />
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white/95">
          Let's <span className="gradient-text">Connect</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        
        {/* ─── Hero Contact Card ────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-10"
        >
          <GlowCard 
            glowColor="violet" 
            enableTilt={false} 
            className="p-8 sm:p-10 border-white/[0.08]"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:justify-between relative z-10">
              <div className="flex-1 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 mx-auto md:mx-0 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]">
                  <MessageSquare className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white/95 mb-3">
                  {contact.headline}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                  {contact.subheadline}
                </p>
              </div>
              
              {/* Direct Booking Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 justify-center">
                <MagneticButton 
                  variant="primary" 
                  size="md" 
                  href={`mailto:${contact.email}`}
                  icon={<Mail className="w-4 h-4" />}
                >
                  Email Direct
                </MagneticButton>
                
                {contact.calendlyUrl && (
                  <MagneticButton 
                    variant="secondary" 
                    size="md" 
                    href={contact.calendlyUrl}
                  >
                    Book a Call
                  </MagneticButton>
                )}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* ─── Form Overlay ────────────────────────────── */}
        {contact.showForm && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mb-10"
          >
            <GlowCard 
              glowColor="cyan" 
              enableTilt={false}
              className="p-8 sm:p-10 border-white/[0.06]"
            >
              <div className="mb-6">
                <h3 className="text-xl font-display font-bold text-white/90 mb-1">Send a System Message</h3>
                <p className="text-xs text-white/40">Your signal will be routed securely straight to my desktop.</p>
              </div>

              <div className="relative min-h-[280px]">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/[0.01] rounded-2xl border border-emerald-500/10"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-white/90 mb-1">Message Dispatched!</h4>
                      <p className="text-xs text-white/40 max-w-xs">I've received your signal and will respond shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-xs font-semibold text-white/40 ml-1 font-mono">NAME</label>
                          <input 
                            id="name"
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe"
                            className="input-premium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-semibold text-white/40 ml-1 font-mono">EMAIL</label>
                          <input 
                            id="email"
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            className="input-premium"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-semibold text-white/40 ml-1 font-mono">MESSAGE</label>
                        <textarea 
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="What can we build together?"
                          className="input-premium resize-none"
                        />
                      </div>

                      {formState === 'error' && (
                        <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3.5 border border-rose-500/15 rounded-xl">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Routing failed. Please use direct email option above.</span>
                        </div>
                      )}

                      <div className="pt-2">
                        <MagneticButton
                          variant="outline"
                          size="md"
                          disabled={formState === 'loading'}
                          className="w-full sm:w-auto"
                        >
                          {formState === 'loading' ? (
                            <span className="flex items-center gap-2.5">
                              <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                              Transmitting...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2.5 group">
                              Send Message
                              <Send className="w-3.5 h-3.5 text-white/40 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </span>
                          )}
                        </MagneticButton>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* ─── Social Links Row ─────────────────────────── */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3.5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          {socialLinks.map((social) => {
            const Icon = iconMap[social.icon] || Mail;
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                variants={fadeUp}
                whileHover={prefersReduced ? {} : { y: -3, scale: 1.04 }}
                className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-violet-400 hover:border-violet-500/35 hover:bg-violet-500/10 flex items-center justify-center transition-all duration-300 group"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 group-hover:scale-105 transition-transform" />
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
export { ContactSection }; // For backwards compatibility
