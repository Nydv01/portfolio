/* =========================================================
   RAW EDITOR
   Advanced CMS interface to edit the entire portfolio
   content store directly in JSON format. Includes parsing
   validation, import, export, and formatting controls.
========================================================= */

import { useState, useEffect } from 'react';
import { useContentStore } from '@/stores/contentStore';
import FormField from '../components/FormField';
import { FileJson, AlertTriangle } from 'lucide-react';

export default function RawEditor() {
  const { content, setContent } = useContentStore();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJsonText(JSON.stringify(content, null, 2));
  }, [content]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // Validate key sections exist
      if (!parsed.profile || !parsed.hero || !parsed.projects) {
        throw new Error('Missing core profile, hero, or projects sections.');
      }
      setContent(parsed);
      setError(null);
      alert('Raw JSON state updated successfully!');
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset local edits back to current saved state?')) {
      setJsonText(JSON.stringify(content, null, 2));
      setError(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
        <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest font-mono flex items-center gap-1.5">
          <FileJson className="w-4 h-4" />
          Raw JSON Content Database
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition-colors"
          >
            Save Schema
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2 animate-fade-up">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Schema Parsing Error:</span>
            <p className="font-mono mt-1 text-[11px] leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      <div className="relative group">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          className="w-full h-[550px] bg-[#0c0c0e]/80 border border-white/[0.06] rounded-xl p-4 font-mono text-xs text-[#a6accd] focus:border-violet-500/50 outline-none resize-y shadow-inner leading-relaxed"
        />
      </div>
    </div>
  );
}
