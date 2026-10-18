"use client";

import { useState, useMemo } from "react";
import { useApi } from "@/hooks/api";
import Loader from "./Loader";
import { Membership } from "@/interfaces";

type Props = {
  onChange?: (value: Membership) => void;
};

export default function Select({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Membership | null>(null);

  const { data, error, isLoading } = useApi.get<Membership[]>(
    "membership",
    "/membership/all",
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((m) =>
      m.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [data, query]);

  if (error) console.log(error);
  if (isLoading) return <Loader />;

  const handleSelect = (m: Membership) => {
    setSelected(m);
    setOpen(false);
    setQuery("");
    onChange?.(m);
  };

  return (
    <div className="w-full max-w-sm relative">
      <h1 className="text-sm font-semibold text-fg mb-2">User</h1>

      <div
        className="bg-card border border-border rounded-xl px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-card-hover transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={selected ? "text-fg" : "text-muted"}>
          {selected ? selected.name : "Select a user"}
        </span>
        <span className="text-muted">▼</span>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-3 py-2 bg-bg-alt text-fg border-b border-border outline-none"
          />

          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-muted text-sm">No users found</div>
            ) : (
              filtered.map((m) => (
                <div
                  key={m.membershipId}
                  onClick={() => handleSelect(m)}
                  className="px-3 py-2 cursor-pointer hover:bg-card-hover transition-colors text-fg"
                >
                  {m.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
