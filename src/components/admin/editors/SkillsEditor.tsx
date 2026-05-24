/* =========================================================
   SKILLS EDITOR
   CMS interface to manage technical skills categories:
   nested drag-and-drop lists, name editing, domain icons,
   gradient selections, and level sliders (0–100%).
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { SkillCategory, SkillItem } from '@/types/content';
import { Code2, Settings } from 'lucide-react';

export default function SkillsEditor() {
  const { content, updateSection } = useContentStore();
  const [categories, setCategories] = useState<SkillCategory[]>([...content.skills]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  useEffect(() => {
    setCategories([...content.skills]);
    if (content.skills.length > 0 && !activeCategoryId) {
      setActiveCategoryId(content.skills[0].id);
    }
  }, [content.skills, activeCategoryId]);

  const saveCategories = (updatedCategories: SkillCategory[]) => {
    const sorted = [...updatedCategories].map((cat, idx) => ({ ...cat, order: idx }));
    setCategories(sorted);
    updateSection('skills', sorted);
  };

  const handleReorderCategories = (reordered: any[]) => {
    saveCategories(reordered as SkillCategory[]);
  };

  const handleAddCategory = () => {
    const newId = `cat-${Date.now()}`;
    const newCat: SkillCategory = {
      id: newId,
      title: 'New Capability Section',
      icon: 'Code2',
      gradient: 'from-violet-500 to-fuchsia-500',
      items: [{ name: 'Skill Node', level: 80 }],
      order: categories.length,
    };
    saveCategories([...categories, newCat]);
    setActiveCategoryId(newId);
  };

  const handleDeleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    saveCategories(updated);
    if (activeCategoryId === id) {
      setActiveCategoryId(updated.length > 0 ? updated[0].id : null);
    }
  };

  // Find currently active category
  const activeCategory = categories.find(c => c.id === activeCategoryId);

  const updateActiveCategoryField = (key: keyof SkillCategory, val: any) => {
    if (!activeCategoryId) return;
    const updated = categories.map(c => {
      if (c.id === activeCategoryId) {
        return { ...c, [key]: val };
      }
      return c;
    });
    saveCategories(updated);
  };

  // Skill Items CRUD handlers
  const handleReorderItems = (reordered: any[]) => {
    const items = reordered.map((item, idx) => ({
      name: item.name,
      level: item.level,
    }));
    updateActiveCategoryField('items', items);
  };

  const handleAddItem = () => {
    if (!activeCategory) return;
    const newItem: SkillItem = { name: 'New Skill', level: 75 };
    updateActiveCategoryField('items', [...activeCategory.items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    if (!activeCategory) return;
    const idx = parseInt(id.split('-')[1], 10);
    const updatedItems = [...activeCategory.items];
    updatedItems.splice(idx, 1);
    updateActiveCategoryField('items', updatedItems);
  };

  // Map activeCategory items to DragListItem shape
  const dragListItems = activeCategory
    ? activeCategory.items.map((item, idx) => ({
        id: `item-${idx}`,
        order: idx,
        ...item,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Category List (Left side) */}
      <div className="lg:col-span-5 space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Domains</h4>
        
        <DragList
          items={categories}
          onReorder={handleReorderCategories}
          onAdd={handleAddCategory}
          onDelete={handleDeleteCategory}
          addLabel="Add Domain"
          renderItem={(item: SkillCategory) => (
            <button
              onClick={() => setActiveCategoryId(item.id)}
              className={`w-full text-left py-1 flex items-center justify-between ${
                activeCategoryId === item.id ? 'text-violet-400 font-semibold' : 'text-white/60'
              }`}
            >
              <span className="truncate text-sm">{item.title}</span>
              <span className="text-[10px] text-white/35 font-mono">({item.items.length} skills)</span>
            </button>
          )}
        />
      </div>

      {/* Category Content + Items (Right side) */}
      <div className="lg:col-span-7">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2 mb-4">Domain Nodes</h4>
        
        {activeCategory ? (
          <div className="space-y-6 bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Category Title"
                value={activeCategory.title}
                onChange={(val) => updateActiveCategoryField('title', val)}
                placeholder="e.g. Frontend Development"
                required
              />
              <FormField
                label="Lucide Icon"
                value={activeCategory.icon}
                onChange={(val) => updateActiveCategoryField('icon', val)}
                placeholder="Layout / Server / Database / Code2"
              />
            </div>
            
            <FormField
              label="Tailwind Gradient Classes"
              value={activeCategory.gradient}
              onChange={(val) => updateActiveCategoryField('gradient', val)}
              placeholder="from-violet-500 to-fuchsia-500"
              helpText="Gradient theme used in sliders and indicators."
            />

            {/* Nested Skill Items Editor */}
            <div className="space-y-4 pt-4 border-t border-white/[0.04]">
              <h5 className="text-xs font-bold text-violet-400 font-mono flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                Category Skill Nodes
              </h5>

              <DragList
                items={dragListItems}
                onReorder={handleReorderItems}
                onAdd={handleAddItem}
                onDelete={handleDeleteItem}
                addLabel="Add Skill Node"
                renderItem={(item: any, idx: number) => {
                  const handleItemChange = (field: keyof SkillItem, val: any) => {
                    const updatedItems = [...activeCategory.items];
                    updatedItems[idx] = { ...updatedItems[idx], [field]: val };
                    updateActiveCategoryField('items', updatedItems);
                  };

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-1">
                      <div className="sm:col-span-7">
                        <FormField
                          label="Skill Name"
                          value={item.name}
                          onChange={(val) => handleItemChange('name', String(val))}
                          placeholder="React.js"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <FormField
                          label="Proficiency Level"
                          type="number"
                          value={item.level}
                          onChange={(val) => handleItemChange('level', Math.min(Math.max(Number(val), 0), 100))}
                          placeholder="85"
                          helpText="Value from 0 to 100."
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-white/30 border border-dashed border-white/10 rounded-2xl font-mono text-sm">
            Select a domain category or create one to start editing
          </div>
        )}
      </div>

    </div>
  );
}
