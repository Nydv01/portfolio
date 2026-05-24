/* =========================================================
   CONTACT EDITOR
   CMS interface to customize communication settings:
   headline, subheadline, direct support email, Calendly
   meeting widget link, and feedback form visibility.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import type { ContactConfig } from '@/types/content';

export default function ContactEditor() {
  const { content, updateSection } = useContentStore();
  const [contact, setContact] = useState<ContactConfig>({ ...content.contact });

  useEffect(() => {
    setContact({ ...content.contact });
  }, [content.contact]);

  const handleChange = (key: keyof ContactConfig, value: any) => {
    const updated = { ...contact, [key]: value };
    setContact(updated);
    updateSection('contact', updated);
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Contact Card Headline"
        value={contact.headline}
        onChange={(val) => handleChange('headline', String(val))}
        placeholder="Let's build something epic together"
        required
      />

      <FormField
        label="Contact Card Subheadline Tagline"
        type="textarea"
        value={contact.subheadline}
        onChange={(val) => handleChange('subheadline', String(val))}
        placeholder="Collaborating on full-stack systems and custom AI integrations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Direct Contact Email"
          type="email"
          value={contact.email}
          onChange={(val) => handleChange('email', String(val))}
          placeholder="your.email@gmail.com"
          required
        />
        
        <FormField
          label="Calendly Meeting Link URL"
          type="url"
          value={contact.calendlyUrl}
          onChange={(val) => handleChange('calendlyUrl', String(val))}
          placeholder="https://calendly.com/your-username"
        />
      </div>

      <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
        <FormField
          label="Display Transmitting Contact Feedback Form"
          type="toggle"
          value={contact.showForm}
          onChange={(val) => handleChange('showForm', Boolean(val))}
          helpText="When enabled, users can submit messages via EmailJS directly from your page."
        />
      </div>
    </div>
  );
}
