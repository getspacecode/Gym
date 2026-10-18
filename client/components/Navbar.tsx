"use client";

import icon from "@/assets/dumbbell.png";
import Image from "next/image";
import { User } from "lucide-react";
import { useAtomValue } from "jotai";
import { membershipAtom } from "@/atom/info";
import Link from "next/link";

export default function Navbar() {
  const membership = useAtomValue(membershipAtom);

  return (
    <div className="bg-bg-alt p-4 border-2 flex justify-between px-10 gap-6 items-center border-b-border border-transparent">
      <div className="flex items-center gap-5">
        <Image loading="eager" src={icon} alt="" width={32} height={32} />
        <h1 className="font-bold text-xl">Gym Town</h1>
      </div>

      <div>
        <Link
          className="bg-primary p-2 rounded-md font-semibold hover:bg-primary-hover"
          href={"/"}
        >
          Trainings
        </Link>
      </div>

      {membership ? (
        <Link
          href={"/account"}
          className="cursor-pointer flex flex-col items-center"
        >
          <User />
          <h1>{membership.name}</h1>
        </Link>
      ) : null}
    </div>
  );
}
