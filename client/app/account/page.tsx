"use client";

import ReloadButton from "@/components/ReloadButton";
import { membershipAtom } from "@/atom/info";
import { useAtomValue } from "jotai";
import Section from "@/components/Section";
import GymPlanDay from "@/components/subpages/GymPlanDay";
import AdminPage from "@/components/subpages/AdminPage";

const getDaysLeft = (end: string | null) => {
  const now = new Date();
  const endDate = new Date(end ?? Date.now());
  const diff = endDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default function Acconut() {
  const membership = useAtomValue(membershipAtom);
  if (membership?.name != "admin") {
    return (
      <div className="min-h-screen bg-bg text-fg p-4 md:p-10 flex justify-center">
        <div className="w-full max-w-full flex flex-col lg:flex-row gap-12">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-3xl">
                Hello, {membership?.name}!
              </h1>
              <h1 className="text-muted text-sm md:text-base">
                You've done a pretty good progress!
              </h1>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-muted text-sm uppercase tracking-wide">
                  Membership Info
                </h2>

                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-muted">ID: </span>
                    <span className="font-medium">
                      {membership?.membershipId}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted">Started: </span>
                    <span className="font-medium">
                      {membership?.start &&
                        new Date(membership.start).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted">Ends: </span>
                    <span className="font-medium">
                      {membership?.end &&
                        new Date(membership.end).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-muted">Time left</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    getDaysLeft(membership?.end ?? null) > 5
                      ? "bg-success/10 text-success border-success/30"
                      : getDaysLeft(membership?.end ?? null) > 0
                        ? "bg-warning/10 text-warning border-warning/30"
                        : "bg-error/10 text-error border-error/30"
                  }`}
                >
                  {getDaysLeft(membership?.end ?? null) < 0
                    ? "EXPIRED"
                    : getDaysLeft(membership?.end ?? null) + " days"}
                </span>
              </div>
              <ReloadButton
                membershipId={membership?.membershipId ?? "Not Found"}
              />
            </div>
          </div>
          <div className="">
            <div className="bg-card border border-border w-full h-max rounded-2xl p-6 md:p-8 flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-3xl">Gym Plan</h1>
              <h1 className="text-muted text-sm md:text-base">
                Follow it to continue your journey in building yourself!
              </h1>
            </div>
            <div className="">
              <Section
                items={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((d, i) => ({
                  label: d,
                  element: (
                    <GymPlanDay
                      membership={membership?.membershipId ?? ""}
                      day={d}
                      key={i}
                    />
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <AdminPage />;
  }
}
