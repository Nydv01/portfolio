/* =========================================================
   ADMIN AUTH — PIN Gate
   Simple password-based authentication for the admin panel.
   Checks against VITE_ADMIN_PIN env var (fallback: 'admin123').
   Auth state persists in sessionStorage (tab-scoped).
========================================================= */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, AlertCircle, Shield } from 'lucide-react';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const SESSION_KEY = 'nexus-admin-auth';
const ENV_PIN = (import.meta as any).env.VITE_ADMIN_PIN;
const ADMIN_PIN_HASH = (import.meta as any).env.VITE_ADMIN_PIN_HASH || '47b14b80c346c3b55d025ddc28e4bbebd58124c20c370ade1d9bd7d496eeb260';

/**
 * Checks if the admin is already authenticated via sessionStorage.
 */
export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Clears admin authentication from sessionStorage.
 */
export function clearAdminAuth(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // silently ignore
  }
}

interface AdminAuthProps {
  onAuthenticated: () => void;
}

/**
 * AdminAuth — Premium dark PIN/password gate component.
 * Renders a centered card with animated entrance. Validates input
 * against the VITE_ADMIN_PIN environment variable.
 */
export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      const hashedInput = await sha256(pin);
      const isMatch = (ENV_PIN && pin === ENV_PIN) || (hashedInput === ADMIN_PIN_HASH);

      if (isMatch) {
        setIsUnlocking(true);
        try {
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch {
          // continue anyway
        }
        // Brief delay for unlock animation
        setTimeout(() => {
          onAuthenticated();
        }, 600);
      } else {
        setError('Invalid PIN. Access denied.');
        setPin('');
      }
    },
    [pin, onAuthenticated]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(225,15%,4%)]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Gradient border accent */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-violet-500/10 via-transparent to-cyan-500/5 pointer-events-none" />

          <div className="relative z-10">
            {/* Logo / Brand */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                animate={isUnlocking ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4"
              >
                <AnimatePresence mode="wait">
                  {isUnlocking ? (
                    <motion.div
                      key="unlock"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-violet-400"
                    >
                      <Unlock className="w-7 h-7" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lock"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-violet-400"
                    >
                      <Lock className="w-7 h-7" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <h1 className="text-2xl font-bold tracking-wide text-white font-[Sora,sans-serif]">
                NEXUS Admin
              </h1>
              <p className="text-white/40 text-sm mt-1">Enter your PIN to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="admin-pin" className="text-sm text-white/50 font-medium">
                  Admin PIN
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    id="admin-pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter admin PIN"
                    autoFocus
                    autoComplete="off"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isUnlocking || !pin.trim()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
              >
                {isUnlocking ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Unlocking...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Unlock Dashboard
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer hint */}
            <p className="text-center text-white/20 text-xs mt-6">
              Protected access · Session-scoped authentication
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
