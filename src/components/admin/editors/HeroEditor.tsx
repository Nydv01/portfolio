/* =========================================================
   HERO EDITOR
   CMS interface to customize the viewport landing page:
   headlines, highlighted text, subtitles, CTAs, status badge,
   and Canvas particle settings (density, speed, colors, etc.).
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import type { HeroConfig } from '@/types/content';

export default function HeroEditor() {
  const { content, updateSection } = useContentStore();
  const [hero, setHero] = useState<HeroConfig>({ ...content.hero });

  useEffect(() => {
    setHero({ ...content.hero });
  }, [content.hero]);

  const handleChange = (key: keyof HeroConfig, value: any) => {
    const updated = { ...hero, [key]: value };
    setHero(updated);
    updateSection('hero', updated);
  };

  const handleCTAChange = (ctaKey: 'primaryCTA' | 'secondaryCTA', field: 'text' | 'action', value: string) => {
    const updatedCTA = { ...hero[ctaKey], [field]: value };
    const updated = { ...hero, [ctaKey]: updatedCTA };
    setHero(updated);
    updateSection('hero', updated);
  };

  const handleParticleChange = (field: string, value: any) => {
    const updatedParticles = { ...hero.particleConfig, [field]: value };
    const updated = { ...hero, particleConfig: updatedParticles };
    setHero(updated);
    updateSection('hero', updated);
  };

  return (
    <div className="space-y-8">
      {/* Headlines Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Headline Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Base Headline Text"
            value={hero.headline}
            onChange={(val) => handleChange('headline', val)}
            placeholder="I build"
            required
            helpText="The initial static part of the title."
          />
          <FormField
            label="Highlighted Text (Gradient)"
            value={hero.highlightedText}
            onChange={(val) => handleChange('highlightedText', val)}
            placeholder="the future of software"
            required
            helpText="The colorful gradient subtitle text."
          />
        </div>

        <FormField
          label="Hero Subheadline Badge Text"
          value={hero.subheadline}
          onChange={(val) => handleChange('subheadline', val)}
          placeholder="Crafting responsive interfaces & intelligent systems"
        />

        <FormField
          label="Availability Status Indicator"
          value={hero.statusBadge}
          onChange={(val) => handleChange('statusBadge', val)}
          placeholder="Open to Internships & Roles"
        />
      </div>

      {/* Call to Actions Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">CTA Buttons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-violet-400 font-mono">Primary Button (Gradient)</h5>
            <FormField
              label="Button Text"
              value={hero.primaryCTA.text}
              onChange={(val) => handleCTAChange('primaryCTA', 'text', String(val))}
              placeholder="Explore My Work"
            />
            <FormField
              label="Scroll Anchor Target"
              value={hero.primaryCTA.action}
              onChange={(val) => handleCTAChange('primaryCTA', 'action', String(val))}
              placeholder="#projects"
            />
          </div>
          
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-white/50 font-mono">Secondary Button (Ghost)</h5>
            <FormField
              label="Button Text"
              value={hero.secondaryCTA.text}
              onChange={(val) => handleCTAChange('secondaryCTA', 'text', String(val))}
              placeholder="Download Resume"
            />
            <FormField
              label="Scroll Anchor / Link Target"
              value={hero.secondaryCTA.action}
              onChange={(val) => handleCTAChange('secondaryCTA', 'action', String(val))}
              placeholder="#about"
            />
          </div>
        </div>
      </div>

      {/* Particles Configuration */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Background Particles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Particle Count"
            type="number"
            value={hero.particleConfig.density}
            onChange={(val) => handleParticleChange('density', val)}
            placeholder="120"
            helpText="More particles create a denser mesh, but might impact performance."
          />
          <FormField
            label="Upward Drift Speed"
            type="number"
            value={hero.particleConfig.speed}
            onChange={(val) => handleParticleChange('speed', val)}
            placeholder="0.2"
          />
          <FormField
            label="Mesh Connection Radius (px)"
            type="number"
            value={hero.particleConfig.connectionDistance}
            onChange={(val) => handleParticleChange('connectionDistance', val)}
            placeholder="130"
          />
          <FormField
            label="Particle Base Primary Hue"
            type="color"
            value={hero.particleConfig.color === 'violet' ? 262 : 185}
            onChange={(val) => handleParticleChange('color', val === 262 ? 'violet' : 'cyan')}
            helpText="Configures the primary particle network spectrum color."
          />
        </div>
      </div>
    </div>
  );
}
