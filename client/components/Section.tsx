"use client";

import { useState } from "react";

type Item = {
  label: string;
  element: React.ReactNode;
};

export default function Section({ items = [] }: { items?: Item[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex overflow-x-auto flex-nowrap w-full p-2 gap-2 border-b border-border">
        {items.map((item, i) => {
          const active = index === i;

          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`font-semibold relative px-3 py-2 rounded-xl text-sm border border-border cursor-pointer whitespace-nowrap flex-shrink-0 ${
                active
                  ? "bg-primary text-fg shadow-md"
                  : "bg-bg-alt text-muted hover:bg-card-hover hover:text-fg"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-bg-alt h-full border border-border rounded-b-xl overflow-auto">
        {items[index]?.element}
      </div>
    </div>
  );
}
