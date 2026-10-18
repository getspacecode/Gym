"use client";
import { useApi } from "@/hooks/api";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSetAtom } from "jotai";
import { membershipAtom } from "@/atom/info";
import { Membership } from "@/interfaces";

export default function ReloadButton({
  membershipId,
}: {
  membershipId: string;
}) {
  const [status, setStatus] = useState<"border" | "error" | "success">(
    "border",
  );
  const setMembership = useSetAtom(membershipAtom);
  const {
    mutateAsync: reloadInfo,
    error,
    isPending,
  } = useApi.post<Membership>("membershipId", `/membership/${membershipId}`);
  useEffect(() => {
    if (membershipId == "Not Found") {
      return;
    }
    if (error) setStatus("error");
    if (isPending) <Loader />;
  }, [error, isPending]);
  const reload = async () => {
    if (membershipId === "Not Found") {
      setStatus("error");
      return;
    }

    try {
      const data = await reloadInfo();

      setMembership(data);
      sessionStorage.setItem("membership", JSON.stringify(data));

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };
  return (
    <button
      onClick={() => reload()}
      className={`bg-primary hover:bg-primary-hover cursor-pointer border-2 border-${status} rounded-2xl p-2 px-4 mt-6`}
    >
      Reload
    </button>
  );
}
