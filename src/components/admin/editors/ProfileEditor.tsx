/* =========================================================
   PROFILE EDITOR
   CMS interface to edit basic developer profile fields:
   name, title, tagline, bio paragraphs, location, email,
   avatar, resume, and availability status.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import type { ProfileData } from '@/types/content';

export default function ProfileEditor() {
  const { content, updateSection } = useContentStore();
  const [profile, setProfile] = useState<ProfileData>({ ...content.profile });

  // Sync with store if it updates from outside
  useEffect(() => {
    setProfile({ ...content.profile });
  }, [content.profile]);

  const handleChange = (key: keyof ProfileData, value: any) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    updateSection('profile', updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          value={profile.name}
          onChange={(val) => handleChange('name', val)}
          placeholder="Nitin Yadav"
          required
        />
        <FormField
          label="Professional Title"
          value={profile.title}
          onChange={(val) => handleChange('title', val)}
          placeholder="Full-Stack Engineer & AI Builder"
          required
        />
      </div>

      <FormField
        label="Tagline"
        value={profile.tagline}
        onChange={(val) => handleChange('tagline', val)}
        placeholder="A short one-liner shown below your name"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Location"
          value={profile.location}
          onChange={(val) => handleChange('location', val)}
          placeholder="Bhopal, India"
        />
        <FormField
          label="Availability Status"
          value={profile.availability}
          onChange={(val) => handleChange('availability', val)}
          placeholder="Available for internships / Open to opportunities"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Email Address"
          type="email"
          value={profile.email}
          onChange={(val) => handleChange('email', val)}
          placeholder="your.email@gmail.com"
          required
        />
        <FormField
          label="Avatar URL (Image Path)"
          type="url"
          value={profile.avatarUrl}
          onChange={(val) => handleChange('avatarUrl', val)}
          placeholder="/avatar.png"
        />
      </div>

      <FormField
        label="Resume Google Drive / Host Link"
        type="url"
        value={profile.resumeUrl}
        onChange={(val) => handleChange('resumeUrl', val)}
        placeholder="https://drive.google.com/..."
      />

      <FormField
        label="Bio Paragraphs (Separated by two newlines)"
        type="textarea"
        value={profile.bio.join('\n\n')}
        onChange={(val) => handleChange('bio', String(val).split('\n\n').filter(Boolean))}
        placeholder="Introduce yourself here..."
        helpText="Press Enter twice to start a new paragraph."
      />
    </div>
  );
}
