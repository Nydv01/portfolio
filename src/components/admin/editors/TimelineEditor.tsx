/* =========================================================
   TIMELINE EDITOR
   CMS interface to manage timeline entries:
   drag-and-drop ordering, year tags, job/degree titles,
   institution tags, icons, and long form descriptions.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { TimelineEvent } from '@/types/content';

export default function TimelineEditor() {
  const { content, updateSection } = useContentStore();
  const [events, setEvents] = useState<TimelineEvent[]>([...content.timeline]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  useEffect(() => {
    setEvents([...content.timeline]);
    if (content.timeline.length > 0 && !activeEventId) {
      setActiveEventId(content.timeline[0].id);
    }
  }, [content.timeline, activeEventId]);

  const saveEvents = (updatedEvents: TimelineEvent[]) => {
    const sorted = [...updatedEvents].map((evt, idx) => ({ ...evt, order: idx }));
    setEvents(sorted);
    updateSection('timeline', sorted);
  };

  const handleReorder = (reordered: any[]) => {
    saveEvents(reordered as TimelineEvent[]);
  };

  const handleAddEvent = () => {
    const newId = `evt-${Date.now()}`;
    const newEvt: TimelineEvent = {
      id: newId,
      year: '2025',
      title: 'New Journey Node',
      institution: 'Organization',
      description: 'Describe the milestone or learning outcomes achieved during this period.',
      icon: 'Code',
      order: events.length,
    };
    saveEvents([...events, newEvt]);
    setActiveEventId(newId);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    saveEvents(updated);
    if (activeEventId === id) {
      setActiveEventId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const activeEvent = events.find(e => e.id === activeEventId);

  const updateActiveEventField = (key: keyof TimelineEvent, val: any) => {
    if (!activeEventId) return;
    const updated = events.map(e => {
      if (e.id === activeEventId) {
        return { ...e, [key]: val };
      }
      return e;
    });
    saveEvents(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Event List (Left) */}
      <div className="lg:col-span-5 space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Timeline Nodes</h4>
        <DragList
          items={events}
          onReorder={handleReorder}
          onAdd={handleAddEvent}
          onDelete={handleDeleteEvent}
          addLabel="Add Timeline Node"
          renderItem={(item: TimelineEvent) => (
            <button
              onClick={() => setActiveEventId(item.id)}
              className={`w-full text-left py-1 ${
                activeEventId === item.id ? 'text-violet-400 font-semibold' : 'text-white/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm">{item.title}</span>
                <span className="text-[10px] text-white/30 font-mono shrink-0">{item.year}</span>
              </div>
              <span className="text-[10px] text-white/30 truncate block font-mono mt-0.5">{item.institution}</span>
            </button>
          )}
        />
      </div>

      {/* Editor Panel (Right) */}
      <div className="lg:col-span-7">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2 mb-4">Node Parameters</h4>
        
        {activeEvent ? (
          <div className="space-y-6 bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Timeline Node Title"
                value={activeEvent.title}
                onChange={(val) => updateActiveEventField('title', val)}
                placeholder="e.g. B.Tech Computer Science"
                required
              />
              <FormField
                label="Year Indicator"
                value={activeEvent.year}
                onChange={(val) => updateActiveEventField('year', val)}
                placeholder="e.g. 2023 - Present"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Institution / Company Name"
                value={activeEvent.institution || ''}
                onChange={(val) => updateActiveEventField('institution', val || undefined)}
                placeholder="e.g. VIT Bhopal University"
              />
              <FormField
                label="Timeline Node Icon"
                value={activeEvent.icon || 'Code'}
                onChange={(val) => updateActiveEventField('icon', val || 'Code')}
                placeholder="GraduationCap / Code / Shield / Brain"
              />
            </div>

            <FormField
              label="Detailed Milestone description"
              type="textarea"
              value={activeEvent.description}
              onChange={(val) => updateActiveEventField('description', val)}
              placeholder="Provide context about what you learned or built..."
            />

          </div>
        ) : (
          <div className="text-center py-12 text-white/30 border border-dashed border-white/10 rounded-2xl font-mono text-sm">
            Select an event or create one to start editing
          </div>
        )}
      </div>

    </div>
  );
}
