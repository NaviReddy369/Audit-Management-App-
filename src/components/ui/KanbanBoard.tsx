import { useState, type ReactNode } from "react";
import type { Tone } from "../../data";
import { toneDot } from "../../lib/ui";

export type KanbanColumnDef = {
  key: string;
  label: string;
  tone: Tone;
};

type KanbanBoardProps<T> = {
  columns: KanbanColumnDef[];
  items: T[];
  getId: (item: T) => string;
  getStage: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  onStageChange: (id: string, stage: string) => void;
};

export function KanbanBoard<T>({ columns, items, getId, getStage, renderCard, onStageChange }: KanbanBoardProps<T>) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);

  return (
    <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
      {columns.map((column) => {
        const columnItems = items.filter((item) => getStage(item) === column.key);
        const isOver = overColumn === column.key;
        return (
          <div
            key={column.key}
            onDragOver={(event) => {
              event.preventDefault();
              setOverColumn(column.key);
            }}
            onDragLeave={() => setOverColumn((current) => (current === column.key ? null : current))}
            onDrop={(event) => {
              event.preventDefault();
              if (draggedId) onStageChange(draggedId, column.key);
              setDraggedId(null);
              setOverColumn(null);
            }}
            className={[
              "flex w-[280px] shrink-0 flex-col rounded-2xl border bg-ink-50/40 p-2.5 transition",
              isOver ? "border-brand-300 bg-brand-50/50" : "border-ink-100"
            ].join(" ")}
          >
            <div className="mb-2 flex items-center justify-between px-1.5 py-1">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <span className={["h-1.5 w-1.5 rounded-full", toneDot(column.tone)].join(" ")} />
                {column.label}
              </span>
              <span className="rounded-md bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-ink-500 shadow-xs">{columnItems.length}</span>
            </div>
            <div className="scrollbar-thin flex min-h-[80px] flex-1 flex-col gap-2 overflow-y-auto px-0.5 pb-1">
              {columnItems.map((item) => {
                const id = getId(item);
                return (
                  <div
                    key={id}
                    draggable
                    onDragStart={() => setDraggedId(id)}
                    onDragEnd={() => setDraggedId(null)}
                    className={["cursor-grab rounded-xl border border-ink-100 bg-surface p-3 shadow-xs transition active:cursor-grabbing", draggedId === id ? "opacity-40" : "hover:border-ink-200 hover:shadow-card"].join(" ")}
                  >
                    {renderCard(item)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
