import { CheckCircle2, Info, TriangleAlert, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Tone } from "../../data";

type ToastEntry = {
  id: number;
  message: string;
  tone: Tone;
};

type ToastContextValue = {
  addToast: (message: string, tone?: Tone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<Tone, typeof Info> = {
  success: CheckCircle2,
  danger: XCircle,
  warning: TriangleAlert,
  info: Info,
  neutral: Info
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const addToast = useCallback((message: string, tone: Tone = "success") => {
    const id = nextId++;
    setToasts((current) => [...current, { id, message, tone }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => {
          const Icon = icons[toast.tone];
          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-ink-100 bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-popover"
            >
              <Icon className="h-4 w-4 shrink-0 text-white/70" />
              {toast.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
