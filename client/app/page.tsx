"use client";

import Loader from "@/components/Loader";
import { useApi } from "@/hooks/api";
import { Attendation, Exercises, Membership } from "@/interfaces";
import { memo, useEffect, useState } from "react";
const AttendRow = memo(function AttendRow({ a }: { a: Attendation }) {
  return (
    <tr className="hover:bg-card-hover transition-colors">
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
    </tr>
  );
});
export default function Home() {
  const [id, setId] = useState(null);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay();
  const currentDay = daysOfWeek[todayIndex];

  useEffect(() => {
    const mem = sessionStorage.getItem("membership");
    if (mem) {
      setId(JSON.parse(mem ?? "").membershipId);
    }
  }, []);
  const {
    data: attends,
    error,
    isLoading,
  } = useApi.get<Attendation[]>("attendation", `/attendation/${id}`, {
    enabled: !!id,
  });
  const {
    data: exercises,
    error: errorExercises,
    isLoading: exercisesLoading,
  } = useApi.get<Exercises[]>("exercise", `/exercise/${id}`);
  if (error) console.error(error);
  if (errorExercises) console.error(errorExercises);
  if (isLoading || exercisesLoading) return <Loader />;
  const todaysExercises = exercises?.filter((e) => e.day === currentDay) ?? [];
  console.log(exercises);
  return (
    <div className="flex justify-center flex-col lg:flex-row p-8 gap-12">
      <div className="w-full h-max max-w-3xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h1 className="text-2xl font-bold text-fg">Training History</h1>
          <p className="mt-1 text-sm text-muted">
            All your gym check-ins are listed below.
          </p>
        </div>

        <table className="w-full">
          <thead className="bg-bg-alt">
            <tr className="text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {attends?.map((a, idx) => (
              <AttendRow key={idx} a={a} />
            ))}
          </tbody>
        </table>

        {!attends?.length && (
          <div className="py-12 text-center text-muted">
            No trainings recorded yet.
          </div>
        )}
      </div>
      <div className="bg-card rounded-2xl border border-border">
        <div className="flex flex-col m-4 gap-2">
          <h1 className="text-2xl text-fg font-bold">Plan for today</h1>
          <p className="text-muted text-sm">
            Get ready to finish this day too!
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-5 m-2">
          {todaysExercises.length ? (
            todaysExercises.map((e, idx) => (
              <div
                key={idx}
                className="border border-border w-full p-1.5 rounded-2xl bg-surface"
              >
                <h1>{e.name}</h1>
              </div>
            ))
          ) : (
            <div className="text-muted m-2 text-sm mt-6 border-t-border border-transparent border">
              Today is a rest day. Take your time and relax from training.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
