import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};

export function Modal({ open, onClose, title, description, children, footer, size = "md" }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} transition className="relative z-50">
      <div
        className="fixed inset-0 bg-ink-900/40 backdrop-blur-[2px] transition duration-200 ease-out data-[closed]:opacity-0"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={[
            "w-full rounded-2xl bg-surface p-6 shadow-popover transition duration-200 ease-out data-[closed]:translate-y-2 data-[closed]:opacity-0",
            sizeClasses[size]
          ].join(" ")}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-base font-semibold text-ink-900">{title}</DialogTitle>
              {description ? <p className="mt-1 text-sm leading-6 text-ink-500">{description}</p> : null}
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>{children}</div>
          {footer ? <div className="mt-6 flex justify-end gap-2.5">{footer}</div> : null}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
