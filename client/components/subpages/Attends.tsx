"use client";

import { useApi } from "@/hooks/api";
import { Attendation } from "@/interfaces";
import { useState } from "react";
import { memo } from "react";

const AttendRow = memo(function AttendRow({ a }: { a: Attendation }) {
  const { mutate: deleteAttendation, error } = useApi.delete(
    "attendation",
    `/attendation/delete`,
  );
  if (error) console.log(error);
  return (
    <tr className="hover:bg-card-hover transition-colors">
      <td className="px-4 py-3 text-fg">{a.membershipId}</td>
      <td className="px-4 py-3 text-fg font-medium">{a.name}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
            a.activeMembership
              ? "bg-success/20 text-success"
              : "bg-error/20 text-error"
          }`}
        >
          {a.activeMembership ? "Active" : "Expired"}
        </span>
      </td>
      <td className="px-4 py-3 text-muted">
        {new Date(a.time).toLocaleString()}
      </td>
      <td
        onClick={() => deleteAttendation({ id: a.id })}
        className="px-4 py-5.5 h-full text-error flex justify-center items-center cursor-pointer bg-error/20 hover:bg-error/40 font-semibold"
      >
        Delete
      </td>
    </tr>
  );
});
export default function Attends() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState<string | null>(null);

  const url = search ? `/attendation/all?query=${search}` : `/attendation/all`;

  const {
    data: attends,
    error,
    isLoading,
  } = useApi.get<Attendation[]>("attendation", url);

  const handleSearch = () => {
    setSearch(input.trim() === "" ? null : input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  if (error) console.log(error);

  return (
    <div className="w-96 overflow-x-scroll rounded-2xl overflow-hidden border border-border bg-card">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full px-3 py-2 bg-bg-alt border-b border-border"
      >
        <input
          autoFocus
          placeholder="Search by name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-fg outline-none"
        />

        <button
          type="submit"
          className="px-3 py-1 rounded-lg bg-success/20 text-success hover:bg-success/30 transition"
        >
          Search
        </button>
      </form>

      <table className="w-full text-sm">
        <thead className="bg-bg-alt text-muted uppercase text-xs tracking-wider">
          <tr>
            <th className="text-left px-4 py-3">UUID</th>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Membership</th>
            <th className="text-left px-4 py-3">Start Date</th>
            <th className="text-left px-4 py-3">Delete</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 rounded-full bg-linear-to-r  from-bg-alt via-border to-surface"></div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="h-4 w-32 rounded-full bg-linear-to-r from-bg-alt via-border to-surface"></div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="h-4 w-20 rounded-full bg-linear-to-r from-bg-alt via-border to-surface"></div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="h-4 w-28 rounded-full bg-linear-to-r from-bg-alt via-border to-surface"></div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="h-4 w-10 rounded-full bg-linear-to-r from-bg-alt via-border to-surface"></div>
                  </td>
                </tr>
              ))
            : attends?.map((a, idx) => <AttendRow key={idx} a={a} />)}
        </tbody>
      </table>
    </div>
  );
}
