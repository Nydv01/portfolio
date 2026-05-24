/* =========================================================
   THEME EDITOR
   CMS interface to customize brand hues, enabled sections,
   and layout section ordering. Renders color sliders
   and previews for real-time CSS property adjustments.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { ThemeConfig } from '@/types/content';

export default function ThemeEditor() {
  const { content, updateSection } = useContentStore();
  const [theme, setTheme] = useState<ThemeConfig>({ ...content.theme });

  useEffect(() => {
    setTheme({ ...content.theme });
  }, [content.theme]);

  const handleChange = (key: keyof ThemeConfig, value: any) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);
    updateSection('theme', updated);

    // Apply color modifications dynamically to document root for real-time preview
    if (key === 'primaryHue') {
      document.documentElement.style.setProperty('--primary', `262 83% 58%`); // Reset to default or compute based on hue
      // We can also adjust the CSS variables based on selected hue:
      document.documentElement.style.setProperty('--violet', `${value} 83% 58%`);
      document.documentElement.style.setProperty('--violet-light', `${value} 83% 72%`);
      document.documentElement.style.setProperty('--violet-dark', `${value} 83% 45%`);
    }
    if (key === 'accentHue') {
      document.documentElement.style.setProperty('--cyan', `${value} 85% 55%`);
      document.documentElement.style.setProperty('--cyan-light', `${value} 80% 70%`);
    }
  };

  // Section Order handlers
  const handleReorderSections = (reordered: any[]) => {
    const order = reordered.map(item => item.name);
    handleChange('sectionOrder', order);
  };

  const handleSectionToggle = (section: string, checked: boolean) => {
    let enabled = [...theme.enabledSections];
    if (checked) {
      if (!enabled.includes(section)) enabled.push(section);
    } else {
      enabled = enabled.filter(s => s !== section);
    }
    handleChange('enabledSections', enabled);
  };

  // Map sectionOrder to DragListItem shape
  const dragListItems = theme.sectionOrder.map((section, idx) => ({
    id: `sec-${section}`,
    name: section,
    order: idx,
  }));

  const allSections = ['projects', 'about', 'skills', 'experience', 'contact'];

  return (
    <div className="space-y-8">
      {/* Hues Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Hues & Colors</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
          <FormField
            label="Primary Brand Color Hue"
            type="color"
            value={theme.primaryHue}
            onChange={(val) => handleChange('primaryHue', val)}
            helpText="Slide to configure the base color hue (violet family)."
          />
          <FormField
            label="Secondary Accent Color Hue"
            type="color"
            value={theme.accentHue}
            onChange={(val) => handleChange('accentHue', val)}
            helpText="Slide to configure the accent color hue (cyan family)."
          />
        </div>
      </div>

      {/* Visibility Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Section Visibility</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {allSections.map(section => {
            const isEnabled = theme.enabledSections.includes(section);
            return (
              <div key={section} className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <span className="text-sm font-medium capitalize text-white/80">{section}</span>
                <FormField
                  label=""
                  type="toggle"
                  value={isEnabled}
                  onChange={(val) => handleSectionToggle(section, Boolean(val))}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Reordering Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Single Page Layout order</h4>
        <p className="text-white/40 text-xs leading-relaxed">Drag to reorder the layout stack of your main landing page.</p>
        
        <DragList
          items={dragListItems}
          onReorder={handleReorderSections}
          renderItem={(item: any) => (
            <div className="py-1">
              <span className="text-sm font-bold capitalize text-white/80">{item.name} Section</span>
            </div>
          )}
        />
      </div>

    </div>
  );
}
