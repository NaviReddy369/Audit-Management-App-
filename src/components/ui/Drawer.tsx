import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: "md" | "lg";
};

export function Drawer({ open, onClose, title, description, children, footer, width = "md" }: DrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} transition className="relative z-50">
      <div
        className="fixed inset-0 bg-ink-900/30 transition duration-200 ease-out data-[closed]:opacity-0"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel
          className={[
            "flex h-full w-full flex-col bg-surface shadow-popover transition duration-200 ease-out data-[closed]:translate-x-full",
            width === "lg" ? "max-w-xl" : "max-w-md"
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-6 py-5">
            <div>
              <DialogTitle className="text-base font-semibold text-ink-900">{title}</DialogTitle>
              {description ? <p className="mt-1 text-sm leading-6 text-ink-500">{description}</p> : null}
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer ? <div className="flex justify-end gap-2.5 border-t border-ink-100 px-6 py-4">{footer}</div> : null}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
