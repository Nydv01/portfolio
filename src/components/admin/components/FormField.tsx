/* =========================================================
   FORM FIELD — Reusable Admin Input Component
   Supports: text, textarea, number, url, email, toggle,
   select, and color (hue slider) input types.
   Dark obsidian styling with glass borders.
========================================================= */

import { useCallback, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

type FieldType = 'text' | 'textarea' | 'number' | 'url' | 'email' | 'toggle' | 'select' | 'color';

interface FormFieldProps {
  /** Field label displayed above the input */
  label: string;
  /** Input type */
  type?: FieldType;
  /** Current field value */
  value: string | number | boolean;
  /** Change callback */
  onChange: (value: string | number | boolean) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Helper text shown below the label */
  helpText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Options for 'select' type */
  options?: { label: string; value: string }[];
  /** Additional CSS class */
  className?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
}

/**
 * FormField — Premium styled form input component for the admin panel.
 * Supports multiple input types with consistent dark theme styling.
 */
export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helpText,
  required = false,
  options = [],
  className = '',
  disabled = false,
}: FormFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.max(el.scrollHeight, 80)}px`;
    }
  }, []);

  useEffect(() => {
    if (type === 'textarea') {
      adjustTextareaHeight();
    }
  }, [type, value, adjustTextareaHeight]);

  const baseInputClasses =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  /** Render the label + helpText header */
  const renderLabel = () => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="text-sm text-white/60 font-medium">
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
      </label>
      {helpText && (
        <span className="group relative">
          <Info className="w-3.5 h-3.5 text-white/30 cursor-help" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs bg-[hsl(225,15%,12%)] border border-white/10 rounded-lg text-white/70 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {helpText}
          </span>
        </span>
      )}
    </div>
  );

  // ─── Toggle / Switch ──────────────────────────────
  if (type === 'toggle') {
    const checked = Boolean(value);
    return (
      <div className={`space-y-0 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-white/60 font-medium">{label}</label>
              {helpText && (
                <span className="text-xs text-white/30">{helpText}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
              checked
                ? 'bg-violet-600 border-violet-500/50'
                : 'bg-white/10 border-white/10'
            } border disabled:opacity-40`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                checked ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  // ─── Color / Hue Slider ───────────────────────────
  if (type === 'color') {
    const hue = typeof value === 'number' ? value : parseInt(String(value), 10) || 0;
    return (
      <div className={`space-y-2 ${className}`}>
        {renderLabel()}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => onChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full h-3 rounded-full appearance-none cursor-pointer disabled:opacity-40"
              style={{
                background: `linear-gradient(to right, hsl(0,80%,60%), hsl(60,80%,60%), hsl(120,80%,60%), hsl(180,80%,60%), hsl(240,80%,60%), hsl(300,80%,60%), hsl(360,80%,60%))`,
              }}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-lg border border-white/10"
              style={{ backgroundColor: `hsl(${hue}, 70%, 55%)` }}
            />
            <span className="text-xs text-white/40 font-mono w-8 text-right">{hue}°</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── Select Dropdown ──────────────────────────────
  if (type === 'select') {
    return (
      <div className={`space-y-1 ${className}`}>
        {renderLabel()}
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`${baseInputClasses} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_16px_center]`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[hsl(225,15%,10%)] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // ─── Textarea ─────────────────────────────────────
  if (type === 'textarea') {
    return (
      <div className={`space-y-1 ${className}`}>
        {renderLabel()}
        <textarea
          ref={textareaRef}
          value={String(value)}
          onChange={(e) => {
            onChange(e.target.value);
            adjustTextareaHeight();
          }}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${baseInputClasses} resize-y min-h-[80px]`}
          rows={3}
        />
      </div>
    );
  }

  // ─── Standard Input (text, number, url, email) ────
  return (
    <div className={`space-y-1 ${className}`}>
      {renderLabel()}
      <input
        type={type}
        value={type === 'number' ? (value as number) : String(value)}
        onChange={(e) =>
          onChange(type === 'number' ? Number(e.target.value) : e.target.value)
        }
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
      />
    </div>
  );
}
