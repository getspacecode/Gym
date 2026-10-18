"use client";
import { useState } from "react";
import DateTimePicker from "../DateTimePicker";
import Select from "../Select";
import { useApi } from "@/hooks/api";
import Loader from "../Loader";

export default function AttendsForm() {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [user, setUser] = useState({
    activeMembership: false,
    membershipId: "",
    name: "",
  });
  const {
    mutate: createAttendation,
    error,
    isPending,
  } = useApi.post("attendation", "/attendation/create");
  if (error) console.log(error);
  if (isPending) <Loader />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createAttendation({
          ...user,
          time: dateTime,
        });
      }}
      className="flex flex-col items-center gap-8"
    >
      <DateTimePicker onChange={(date) => setDateTime(date)} />
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Select
          onChange={(v) =>
            setUser({
              ...user,
              name: v.name,
              activeMembership: v.active,
              membershipId: v.membershipId,
            })
          }
        />
      </div>
      <button className="bg-primary hover:bg-primary-hover p-2 px-4 text-center rounded-2xl border border-border cursor-pointer">
        Create Attendation
      </button>
    </form>
  );
}
