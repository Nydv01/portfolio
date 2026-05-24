/* =========================================================
   PROJECTS EDITOR
   CMS interface with full CRUD and drag-and-drop reordering
   for portfolio projects. Allows customizing case study details,
   tech stack arrays (tags), repository URLs, and featured flags.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import DragList from '../components/DragList';
import type { Project } from '@/types/content';
import { Sparkles, Trash2, LayoutGrid, Terminal } from 'lucide-react';

export default function ProjectsEditor() {
  const { content, updateSection } = useContentStore();
  const [projects, setProjects] = useState<Project[]>([...content.projects]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    setProjects([...content.projects]);
    if (content.projects.length > 0 && !activeProjectId) {
      setActiveProjectId(content.projects[0].id);
    }
  }, [content.projects, activeProjectId]);

  const saveProjects = (updatedProjects: Project[]) => {
    const sorted = [...updatedProjects].map((proj, idx) => ({ ...proj, order: idx }));
    setProjects(sorted);
    updateSection('projects', sorted);
  };

  const handleReorder = (reordered: any[]) => {
    saveProjects(reordered as Project[]);
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      title: 'New System Build',
      subtitle: 'Backend Microservices / AI Core',
      description: 'A brief 2-3 sentence summary of the project architecture and features.',
      techStack: ['React', 'TypeScript', 'Node.js'],
      highlights: ['Implemented REST APIs', 'Optimized database queries'],
      githubUrl: 'https://github.com/Nydv01',
      liveUrl: null,
      imageUrl: '',
      featured: false,
      caseStudy: {
        problem: 'Describe the main technical hurdle or architectural bottleneck.',
        solution: 'Explain how you resolved it using design patterns or tools.',
        outcome: 'Mention quantitative benefits like speedup or cost savings.',
      },
      order: projects.length,
    };
    saveProjects([...projects, newProj]);
    setActiveProjectId(newId);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    if (activeProjectId === id) {
      setActiveProjectId(updated.length > 0 ? updated[0].id : null);
    }
  };

  // Find currently active project in local state
  const activeProject = projects.find(p => p.id === activeProjectId);

  const updateActiveProjectField = (key: keyof Project, val: any) => {
    if (!activeProjectId) return;
    const updated = projects.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, [key]: val };
      }
      return p;
    });
    saveProjects(updated);
  };

  const updateActiveCaseStudyField = (key: string, val: string) => {
    if (!activeProject || !activeProjectId) return;
    const cs = activeProject.caseStudy || { problem: '', solution: '', outcome: '' };
    const updatedCS = { ...cs, [key]: val };
    updateActiveProjectField('caseStudy', updatedCS);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left side list view (Drag reorder) */}
      <div className="lg:col-span-5 space-y-4">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2">Systems Stack</h4>
        
        <DragList
          items={projects}
          onReorder={handleReorder}
          onAdd={handleAddProject}
          onDelete={handleDeleteProject}
          addLabel="Add New Project"
          renderItem={(item: Project) => (
            <button
              onClick={() => setActiveProjectId(item.id)}
              className={`w-full text-left py-1 ${
                activeProjectId === item.id ? 'text-violet-400 font-semibold' : 'text-white/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm">{item.title}</span>
                {item.featured && (
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-white/30 truncate block font-mono mt-0.5">{item.subtitle}</span>
            </button>
          )}
        />
      </div>

      {/* Right side editing pane */}
      <div className="lg:col-span-7">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono border-b border-white/[0.04] pb-2 mb-4">System Details</h4>
        
        {activeProject ? (
          <div className="space-y-6 bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">ID: {activeProject.id}</span>
              <FormField
                label="Featured Spotlight Card"
                type="toggle"
                value={activeProject.featured}
                onChange={(val) => updateActiveProjectField('featured', val)}
                className="shrink-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="System Title"
                value={activeProject.title}
                onChange={(val) => updateActiveProjectField('title', val)}
                placeholder="e.g. WanderGlow"
                required
              />
              <FormField
                label="Subtitle (Architecture info)"
                value={activeProject.subtitle}
                onChange={(val) => updateActiveProjectField('subtitle', val)}
                placeholder="e.g. AI Travel Planner"
              />
            </div>

            <FormField
              label="System Overview description"
              type="textarea"
              value={activeProject.description}
              onChange={(val) => updateActiveProjectField('description', val)}
              placeholder="Provide a 2-3 sentence high level overview..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="GitHub Repository URL"
                type="url"
                value={activeProject.githubUrl}
                onChange={(val) => updateActiveProjectField('githubUrl', val)}
                placeholder="https://github.com/..."
              />
              <FormField
                label="Live Demo Link"
                type="url"
                value={activeProject.liveUrl || ''}
                onChange={(val) => updateActiveProjectField('liveUrl', val || null)}
                placeholder="https://..."
              />
            </div>

            <FormField
              label="Cover Image Path / Asset URL"
              value={activeProject.imageUrl}
              onChange={(val) => updateActiveProjectField('imageUrl', val)}
              placeholder="/projects/cover.png"
            />

            <FormField
              label="Technologies used (Comma separated tags)"
              value={activeProject.techStack.join(', ')}
              onChange={(val) => updateActiveProjectField('techStack', String(val).split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="React, TypeScript, Tailwind"
              helpText="Comma separated: React, Zustand, Express"
            />

            <FormField
              label="Key Deliverables & Highlights (One per line)"
              type="textarea"
              value={activeProject.highlights.join('\n')}
              onChange={(val) => updateActiveProjectField('highlights', String(val).split('\n').filter(Boolean))}
              placeholder="Developed real-time sync module&#10;Integrated Google Gemini models"
              helpText="Separated by single newlines."
            />

            {/* Case Study Section */}
            <div className="space-y-4 pt-4 border-t border-white/[0.04]">
              <h5 className="text-xs font-bold text-violet-400 font-mono flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Case Study Metrics
              </h5>
              
              <div className="space-y-4">
                <FormField
                  label="Architectural Bottleneck (Problem)"
                  type="textarea"
                  value={activeProject.caseStudy?.problem || ''}
                  onChange={(val) => updateActiveCaseStudyField('problem', String(val))}
                  placeholder="What was the main system design hurdle?"
                />
                <FormField
                  label="Resolution Framework (Solution)"
                  type="textarea"
                  value={activeProject.caseStudy?.solution || ''}
                  onChange={(val) => updateActiveCaseStudyField('solution', String(val))}
                  placeholder="How did you resolve it?"
                />
                <FormField
                  label="Quantified Outcome"
                  type="textarea"
                  value={activeProject.caseStudy?.outcome || ''}
                  onChange={(val) => updateActiveCaseStudyField('outcome', String(val))}
                  placeholder="What was the result? (e.g. 40% speed up)"
                />
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-white/30 border border-dashed border-white/10 rounded-2xl font-mono text-sm">
            Select a project or create one to start editing
          </div>
        )}
      </div>

    </div>
  );
}
