"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { Membership } from "@/interfaces";
import { membershipAtom } from "@/atom/info";

export default function AuthHydrator() {
  const setMembership = useSetAtom(membershipAtom);

  useEffect(() => {
    const stored = sessionStorage.getItem("membership");

    if (stored) {
      const membership: Membership = JSON.parse(stored);
      setMembership(membership);
    }
  }, [setMembership]);

  return null;
}
