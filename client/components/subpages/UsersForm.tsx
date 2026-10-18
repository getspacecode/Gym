"use client";

import { useApi } from "@/hooks/api";
import Loader from "../Loader";
import { useState } from "react";
import { Membership } from "@/interfaces";

export default function UsersForm() {
  const [newMembership, setNewMembership] = useState<Membership | null>(null);
  const [name, setName] = useState("");

  const {
    mutateAsync: createNewMembership,
    error,
    isPending,
  } = useApi.post("membership", "/membership/create");

  if (error) console.error(error);
  if (isPending) return <Loader />;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 p-6">
      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
          className="w-full px-4 py-3 bg-bg-alt text-fg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
        />

        <button
          onClick={async () => {
            if (name) {
              const res = await createNewMembership({ name });
              setNewMembership(res);
              setName("");
            }
          }}
          className="bg-primary hover:bg-primary-hover py-3 rounded-xl border border-border font-semibold transition active:scale-95"
        >
          Create Membership
        </button>
      </div>
      {newMembership && (
        <div className="w-full max-w-md bg-bg-alt border border-border rounded-2xl p-6 shadow-lg flex flex-col gap-4">
          <h2 className="text-xl font-bold text-fg">New Membership Created</h2>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Name:</span>
              <span className="font-medium">{newMembership.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Membership ID:</span>
              <span className="font-mono text-primary w-min">
                {newMembership.membershipId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Start Date:</span>
              <span>{new Date(newMembership.start).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">End Date:</span>
              <span>{new Date(newMembership.end).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
