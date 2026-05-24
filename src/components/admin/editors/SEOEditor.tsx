/* =========================================================
   SEO CONFIG EDITOR
   CMS interface to configure search index visibility metadata:
   page title, meta descriptions, OpenGraph share images,
   keywords (arrays), and index URL.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import type { SEOConfig } from '@/types/content';

export default function SEOEditor() {
  const { content, updateSection } = useContentStore();
  const [seo, setSeo] = useState<SEOConfig>({ ...content.seo });

  useEffect(() => {
    setSeo({ ...content.seo });
  }, [content.seo]);

  const handleChange = (key: keyof SEOConfig, value: any) => {
    const updated = { ...seo, [key]: value };
    setSeo(updated);
    updateSection('seo', updated);
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Search Engine Title (Meta Title)"
        value={seo.title}
        onChange={(val) => handleChange('title', String(val))}
        placeholder="Nitin Yadav | Full-Stack Engineer"
        required
        helpText="The title displayed in browser tabs and search results. Recommended length: 50-60 characters."
      />
      <div className="text-right text-[10px] font-mono text-white/30 -mt-4 pr-1">
        {seo.title.length} / 60 chars
      </div>

      <FormField
        label="OpenGraph Sharing Metadata URL"
        type="url"
        value={seo.url}
        onChange={(val) => handleChange('url', String(val))}
        placeholder="https://yourwebsite.com"
        required
      />

      <FormField
        label="OpenGraph Social Image URL"
        type="url"
        value={seo.ogImage}
        onChange={(val) => handleChange('ogImage', String(val))}
        placeholder="https://yourwebsite.com/og-image.png"
        helpText="Link to the card preview image shown when shared on Twitter/LinkedIn."
      />

      <FormField
        label="Meta Keywords (Comma separated tags)"
        value={seo.keywords.join(', ')}
        onChange={(val) => handleChange('keywords', String(val).split(',').map(s => s.trim()).filter(Boolean))}
        placeholder="Full-Stack, AI Builder, Web Developer"
        helpText="Press comma to separate: React, Cybersecurity, VIT Bhopal"
      />

      <FormField
        label="Search Engine Index Description (Meta Description)"
        type="textarea"
        value={seo.description}
        onChange={(val) => handleChange('description', String(val))}
        placeholder="Nitin Yadav is a Computer Science Engineering student building scalable software systems and AI integrations..."
        required
        helpText="Search results description. Recommended length: 150-160 characters."
      />
      <div className="text-right text-[10px] font-mono text-white/30 -mt-4 pr-1">
        {seo.description.length} / 160 chars
      </div>
    </div>
  );
}
