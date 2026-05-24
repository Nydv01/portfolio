/* =========================================================
   SOCIAL LINKS EDITOR
   CMS interface to manage developer social connections:
   GitHub, LinkedIn, Email anchors. Supports adding, reordering,
   platform titles, Lucide icon maps, and labels.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { SocialLink } from '@/types/content';

export default function SocialEditor() {
  const { content, updateSection } = useContentStore();
  const [links, setLinks] = useState<SocialLink[]>([...content.socialLinks]);

  useEffect(() => {
    setLinks([...content.socialLinks]);
  }, [content.socialLinks]);

  const saveLinks = (updatedLinks: SocialLink[]) => {
    const sorted = [...updatedLinks].map((link, idx) => ({ ...link, order: idx }));
    setLinks(sorted);
    updateSection('socialLinks', sorted);
  };

  const handleReorder = (reordered: any[]) => {
    saveLinks(reordered as SocialLink[]);
  };

  const handleAddLink = () => {
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: 'GitHub',
      url: 'https://github.com/your-username',
      icon: 'Github',
      label: 'GitHub',
      order: links.length,
    };
    saveLinks([...links, newLink]);
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter(l => l.id !== id);
    saveLinks(updated);
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Connect Channels</h4>
      
      <DragList
        items={links}
        onReorder={handleReorder}
        onAdd={handleAddLink}
        onDelete={handleDeleteLink}
        addLabel="Add Social Channel"
        renderItem={(item: SocialLink, idx: number) => {
          const handleItemChange = (field: keyof SocialLink, val: string) => {
            const updated = [...links];
            updated[idx] = { ...updated[idx], [field]: val };
            saveLinks(updated);
          };

          return (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-1">
              <FormField
                label="Platform Title"
                value={item.platform}
                onChange={(val) => handleItemChange('platform', String(val))}
                placeholder="GitHub"
              />
              <FormField
                label="Lucide Icon"
                value={item.icon}
                onChange={(val) => handleItemChange('icon', String(val))}
                placeholder="Github / Linkedin / Mail"
              />
              <FormField
                label="Channel Label"
                value={item.label}
                onChange={(val) => handleItemChange('label', String(val))}
                placeholder="GitHub Profile"
              />
              <FormField
                label="Channel Link URL"
                type="url"
                value={item.url}
                onChange={(val) => handleItemChange('url', String(val))}
                placeholder="https://..."
              />
            </div>
          );
        }}
      />
    </div>
  );
}
