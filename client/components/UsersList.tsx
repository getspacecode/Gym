"use client";

import { useApi } from "@/hooks/api";
import { Membership } from "@/interfaces";
import Loader from "./Loader";

export default function UsersList() {
  const {
    data: members,
    error,
    isLoading,
  } = useApi.get<Membership[]>("membership", "/membership/all");
  const {
    mutate: deleteMember,
    error: deleteError,
    isPending: deletePending,
  } = useApi.delete("membership", "/membership/delete");
  if (error) console.log(error);
  if (deleteError) console.log(deleteError);
  if (deletePending) <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card w-96 overflow-x-scroll">
      <table className="w-full text-sm">
        <thead className="bg-bg-alt text-muted uppercase text-xs tracking-wider">
          <tr>
            <th className="text-left px-4 py-3">UUID</th>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Membership</th>
            <th className="text-left px-4 py-3">Start Date</th>
            <th className="text-left px-4 py-3">End Date</th>
            <th className="text-left px-4 py-3">Delete</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border overflow-x-scroll">
          {members?.map((m) => (
            <tr
              key={m.membershipId}
              className="hover:bg-card-hover transition-colors"
            >
              <td className="px-4 py-3 text-fg">{m.membershipId}</td>
              <td className="px-4 py-3 text-fg font-medium">{m.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    m.active
                      ? "bg-success/20 text-success"
                      : "bg-error/20 text-error"
                  }`}
                >
                  {m.active ? "Active" : "Expired"}
                </span>
              </td>

              <td className="px-4 py-3 text-muted">
                {new Date(m.start).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              <td className="px-4 py-3 text-muted">
                {new Date(m.end).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td
                onClick={() => deleteMember({ id: m.membershipId })}
                className="px-4 py-5.5 h-full text-error flex justify-center items-center cursor-pointer bg-error/20 hover:bg-error/40 font-semibold"
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
