import { ChevronDown, ChevronsUpDown, ChevronUp, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right";
  width?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  searchPlaceholder?: string;
  searchKeys?: (row: T) => string;
  filters?: ReactNode;
  emptyState?: ReactNode;
  defaultSortKey?: string;
  defaultSortDir?: "asc" | "desc";
};

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  onRowClick,
  searchPlaceholder = "Search...",
  searchKeys,
  filters,
  emptyState,
  defaultSortKey,
  defaultSortDir = "asc"
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDir);

  const filtered = useMemo(() => {
    if (!query.trim() || !searchKeys) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter((row) => searchKeys(row).toLowerCase().includes(q));
  }, [rows, query, searchKeys]);

  const sorted = useMemo(() => {
    const column = columns.find((c) => c.key === sortKey);
    if (!column?.sortValue) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = column.sortValue!(a);
      const bv = column.sortValue!(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, columns, sortKey, sortDir]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div>
      {(searchKeys || filters) && (
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchKeys ? (
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="input w-full pl-9"
              />
            </div>
          ) : (
            <div />
          )}
          {filters ? <div className="flex flex-wrap gap-2">{filters}</div> : null}
        </div>
      )}

      <div className="scrollbar-thin overflow-x-auto rounded-xl border border-ink-100">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={column.width ? { width: column.width } : undefined}
                  className={["px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-500", column.align === "right" ? "text-right" : "text-left"].join(" ")}
                >
                  {column.sortValue ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className={["inline-flex items-center gap-1 transition hover:text-ink-800", column.align === "right" ? "flex-row-reverse" : ""].join(" ")}
                    >
                      {column.header}
                      {sortKey === column.key ? (
                        sortDir === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 text-ink-300" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10">
                  {emptyState ?? <p className="text-center text-sm text-ink-400">No results.</p>}
                </td>
              </tr>
            ) : (
              sorted.map((row) => (
                <tr
                  key={getRowId(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={["border-b border-ink-50 last:border-none", onRowClick ? "cursor-pointer transition hover:bg-ink-50/70" : ""].join(" ")}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={["px-4 py-3 align-middle text-ink-700", column.align === "right" ? "text-right" : "text-left"].join(" ")}>
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Showing {sorted.length} of {rows.length}
      </p>
    </div>
  );
}
