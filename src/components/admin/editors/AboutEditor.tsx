/* =========================================================
   ABOUT EDITOR
   CMS interface to edit developer biographical info, philosophy,
   paragraphs, and drag-and-drop reorderable quick facts lists.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { AboutData, QuickFact } from '@/types/content';

export default function AboutEditor() {
  const { content, updateSection } = useContentStore();
  const [about, setAbout] = useState<AboutData>({ ...content.about });

  useEffect(() => {
    setAbout({ ...content.about });
  }, [content.about]);

  const handleChange = (key: keyof AboutData, value: any) => {
    const updated = { ...about, [key]: value };
    setAbout(updated);
    updateSection('about', updated);
  };

  // Facts handlers
  const handleReorderFacts = (reordered: any[]) => {
    const updatedFacts = reordered.map((item, idx) => ({
      icon: item.icon,
      label: item.label,
      value: item.value,
    }));
    handleChange('quickFacts', updatedFacts);
  };

  const handleAddFact = () => {
    const newFact: QuickFact = {
      icon: 'MapPin',
      label: 'New Fact',
      value: 'Value text',
    };
    handleChange('quickFacts', [...about.quickFacts, newFact]);
  };

  const handleDeleteFact = (id: string) => {
    const idx = parseInt(id.split('-')[1], 10);
    const updated = [...about.quickFacts];
    updated.splice(idx, 1);
    handleChange('quickFacts', updated);
  };

  // Map quickFacts to DragListItem format (needs id and order)
  const dragListItems = about.quickFacts.map((fact, idx) => ({
    id: `fact-${idx}`,
    order: idx,
    ...fact,
  }));

  return (
    <div className="space-y-8">
      
      {/* Editorial Content */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Editorial Info</h4>
        <FormField
          label="Headline"
          value={about.headline}
          onChange={(val) => handleChange('headline', val)}
          placeholder="Who is behind Nitin?"
          required
        />
        <FormField
          label="Engineering Philosophy Quote"
          type="textarea"
          value={about.philosophy}
          onChange={(val) => handleChange('philosophy', val)}
          placeholder="Keep it simple. Build with purpose."
        />
        <FormField
          label="Detailed Biography Paragraphs (Separated by double newlines)"
          type="textarea"
          value={about.paragraphs.join('\n\n')}
          onChange={(val) => handleChange('paragraphs', String(val).split('\n\n').filter(Boolean))}
          placeholder="Write paragraphs explaining your history, skills, and motivations..."
        />
      </div>

      {/* Quick Facts Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Quick Stats & Facts</h4>
        <DragList
          items={dragListItems}
          onReorder={handleReorderFacts}
          onAdd={handleAddFact}
          onDelete={handleDeleteFact}
          addLabel="Add Profile Fact"
          renderItem={(item: any, idx: number) => {
            const handleItemChange = (field: keyof QuickFact, val: string) => {
              const updatedFacts = [...about.quickFacts];
              updatedFacts[idx] = { ...updatedFacts[idx], [field]: val };
              handleChange('quickFacts', updatedFacts);
            };

            return (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-1">
                <FormField
                  label="Lucide Icon"
                  value={item.icon}
                  onChange={(val) => handleItemChange('icon', String(val))}
                  placeholder="MapPin / GraduationCap / Calendar"
                />
                <FormField
                  label="Label Title"
                  value={item.label}
                  onChange={(val) => handleItemChange('label', String(val))}
                  placeholder="Location"
                />
                <FormField
                  label="Stat Value"
                  value={item.value}
                  onChange={(val) => handleItemChange('value', String(val))}
                  placeholder="Bhopal, India"
                />
              </div>
            );
          }}
        />
      </div>

    </div>
  );
}
