"use client";

import { useApi } from "@/hooks/api";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { MembershipDTO } from "@/interfaces";
import { useAtom } from "jotai";
import { membershipAtom } from "@/atom/info";

export default function Logging() {
  const [input, setInput] = useState<string>("");
  const [status, setStatus] = useState<"border" | "success" | "error">(
    "border",
  );

  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [, setMembership] = useAtom(membershipAtom);

  const {
    mutateAsync: loginMutation,
    error: loginError,
    isPending: loginLoading,
  } = useApi.post<MembershipDTO>("membership", `/membership/authenticate`);

  useEffect(() => {
    const token = sessionStorage.getItem("sessionToken");

    if (token) {
      setHasToken(true);
    }

    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (loginError) {
      setStatus("error");
    }
  }, [loginError]);

  if (isCheckingAuth) return null;

  if (hasToken) return null;

  if (loginLoading) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await loginMutation({ input });

            if (res?.token) {
              sessionStorage.setItem("sessionToken", res.token);
              sessionStorage.setItem(
                "membership",
                JSON.stringify(res.membership),
              );
              setStatus("success");
              setHasToken(true);
              setMembership(res.membership);
            }
          } catch (err) {
            console.error(err);
            setStatus("error");
          }
        }}
        className={`bg-bg-alt border-2 border-${status} p-10 m-3 rounded-2xl flex flex-col justify-center items-center gap-12`}
      >
        <div className="flex flex-col justify-center gap-8 items-center">
          <h1>In order to proceed, enter your Gym Town membership ID</h1>

          <input
            type="text"
            className="bg-card focus:bg-card-hover outline-none rounded-lg w-max p-1 border border-border"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover cursor-pointer w-max p-2 px-4 rounded-2xl border border-border"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
