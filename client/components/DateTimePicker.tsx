"use client";

import { useEffect, useState } from "react";

type Props = {
  onChange?: (value: Date) => void;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function DateTimePicker({ onChange }: Props) {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [time, setTime] = useState("12:00");

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const [hours, minutes] = time.split(":").map(Number);
  const selectedDate = new Date(year, month, day, hours, minutes);

  useEffect(() => {
    if (!isNaN(selectedDate.getTime())) {
      onChange?.(selectedDate);
    }
  }, [year, month, day, time]);

  const handlePrevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="w-full max-w-md bg-bg-alt border border-border rounded-2xl p-4 text-fg">
      <div className="flex justify-between items-center mb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="px-2 py-1 bg-surface rounded-lg"
        >
          ◀
        </button>

        <div className="font-semibold">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="px-2 py-1 bg-surface rounded-lg"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-muted text-sm mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const isSelected = d === day;

          return (
            <button
              key={d}
              type="button"
              onClick={() => setDay(d)}
              className={`h-9 rounded-lg flex items-center justify-center text-sm transition
                ${
                  isSelected
                    ? "bg-primary text-fg"
                    : "bg-surface hover:bg-card-hover text-muted hover:text-fg"
                }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="text-sm text-muted block mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-surface border border-border rounded-lg p-2 text-fg outline-none"
        />
      </div>
    </div>
  );
}
