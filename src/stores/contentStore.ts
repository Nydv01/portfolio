/* =========================================================
   CONTENT STORE — Zustand
   Central state management for portfolio content.
   Loads from localStorage, falls back to defaults.
========================================================= */

import { create } from 'zustand';
import type { PortfolioContent } from '@/types/content';
import { defaultContent } from '@/data/defaultContent';

const STORAGE_KEY = 'nexus-portfolio-content';

function loadFromStorage(): PortfolioContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Auto-merge array sections to ensure newly added default items are populated
      const arrayKeys: Array<keyof PortfolioContent> = ['projects', 'timeline', 'certifications', 'achievements', 'skills'];
      for (const key of arrayKeys) {
        if (parsed[key] && Array.isArray(parsed[key]) && defaultContent[key] && Array.isArray(defaultContent[key])) {
          const parsedItems = parsed[key] as any[];
          const defaultItems = defaultContent[key] as any[];
          const parsedIds = new Set(parsedItems.map((item: any) => item.id || item.title || item.name));
          
          const newItems = defaultItems.filter(item => !parsedIds.has(item.id || item.title || item.name));
          if (newItems.length > 0) {
            parsed[key] = [...parsedItems, ...newItems];
            if (typeof (parsed[key][0]?.order) === 'number') {
              (parsed[key] as any[]).sort((a, b) => a.order - b.order);
            }
          }
        }
      }

      if (parsed.profile) {
        if (!parsed.profile.resumeUrl || parsed.profile.resumeUrl.includes('drive.google.com') || parsed.profile.resumeUrl.includes('docs.google.com') || parsed.profile.resumeUrl !== '/resume.pdf') {
          parsed.profile.resumeUrl = '/resume.pdf';
        }
      }

      return { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.warn('[ContentStore] Failed to load from localStorage:', e);
  }
  return defaultContent;
}

function saveToStorage(content: PortfolioContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.warn('[ContentStore] Failed to save to localStorage:', e);
  }
}

interface ContentStore {
  content: PortfolioContent;
  isAdmin: boolean;

  // Actions
  setContent: (content: PortfolioContent) => void;
  updateSection: <K extends keyof PortfolioContent>(
    key: K,
    value: PortfolioContent[K]
  ) => void;
  resetToDefaults: () => void;
  exportContent: () => string;
  importContent: (json: string) => boolean;
  setAdmin: (isAdmin: boolean) => void;
}

export const useContentStore = create<ContentStore>((set, get) => ({
  content: loadFromStorage(),
  isAdmin: false,

  setContent: (content) => {
    set({ content });
    saveToStorage(content);
  },

  updateSection: (key, value) => {
    const updated = { ...get().content, [key]: value };
    set({ content: updated });
    saveToStorage(updated);
  },

  resetToDefaults: () => {
    set({ content: defaultContent });
    saveToStorage(defaultContent);
  },

  exportContent: () => {
    return JSON.stringify(get().content, null, 2);
  },

  importContent: (json: string) => {
    try {
      const parsed = JSON.parse(json) as PortfolioContent;
      // Basic validation — check that key sections exist
      if (!parsed.profile || !parsed.hero || !parsed.projects) {
        throw new Error('Invalid content structure');
      }
      const merged = { ...defaultContent, ...parsed };
      set({ content: merged });
      saveToStorage(merged);
      return true;
    } catch (e) {
      console.error('[ContentStore] Import failed:', e);
      return false;
    }
  },

  setAdmin: (isAdmin) => set({ isAdmin }),
}));
