import React, { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHslTheme } from "./HslThemeContext";
import { Calendar, CheckCircle2, Info, X } from "lucide-react";

export type ToastVariant = "accent" | "success" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends Required<Pick<ToastOptions, "title" | "variant" | "duration">> {
  id: string;
  description?: string;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = "accent", duration = 4200 }: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const nextToast: ToastItem = {
        id,
        title,
        description,
        variant,
        duration,
      };

      setToasts((prev) => [...prev.slice(-2), nextToast]);

      window.setTimeout(() => {
        dismissToast(id);
      }, duration);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ToastViewport: React.FC<ToastViewportProps> = ({ toasts, onDismiss }) => {
  const { hue, saturation, lightness } = useHslTheme();
  const prefersReducedMotion = useReducedMotion();

  const accentColor = `hsl(${hue}, ${Math.min(saturation + 10, 75)}%, ${Math.min(lightness, 44)}%)`;
  const accentSoftBg = `hsla(${hue}, ${saturation}%, 94%, 1)`;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed top-20 right-4 sm:right-6 z-[70] flex flex-col gap-2.5 w-[calc(100vw-2rem)] sm:w-full max-w-sm"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon =
            toast.variant === "success"
              ? CheckCircle2
              : toast.variant === "info"
                ? Info
                : Calendar;

          const iconContainerClass =
            toast.variant === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : toast.variant === "info"
                ? "bg-[#FAF7F2] text-[#5C4D3E] border-[#E8DFC8]"
                : "border-[#E8DFC8]";

          return (
            <motion.div
              key={toast.id}
              layout
              role="status"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative overflow-hidden rounded-2xl bg-white/98 backdrop-blur-md border border-[#E5DDD2] shadow-lg p-3.5 sm:p-4 text-[#2D241E]"
            >
              <div className="flex items-start gap-3">
                <div
                  style={
                    toast.variant === "accent"
                      ? { backgroundColor: accentSoftBg, color: accentColor }
                      : undefined
                  }
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${iconContainerClass}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <p className="text-xs sm:text-sm font-bold text-[#2D241E] leading-snug">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="text-xs text-[#635345] mt-0.5 leading-relaxed">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  aria-label="Fermer la notification"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#8C7A68] hover:text-[#2D241E] hover:bg-black/5 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Smooth auto-dismiss progress bar */}
              {!prefersReducedMotion && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: toast.duration / 1000, ease: "linear" }}
                  style={{
                    backgroundColor:
                      toast.variant === "success" ? "#10B981" : accentColor,
                    transformOrigin: "left",
                  }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
