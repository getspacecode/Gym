"use client";

import Section from "@/components/Section";
import Attends from "@/components/subpages/Attends";
import AttendsForm from "@/components/subpages/AttendsForm";
import UsersForm from "@/components/subpages/UsersForm";
import UsersList from "@/components/UsersList";
import { Membership } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [membership, setMem] = useState<Membership | null>(null);
  useEffect(() => {
    const mem = sessionStorage.getItem("membership");
    if (mem) {
      setMem(JSON.parse(mem ?? "").membershipId);
    }
  }, []);

  return (
    <div className="w-full h-full gap-2 flex lg:flex-row flex-col">
      <div className="w-full">
        <Section
          items={[
            {
              label: "Attendations",
              element: (
                <div className="flex flex-col lg:flex-row gap-12 lg:*:w-1/2">
                  <AttendsForm />
                  <Attends />
                </div>
              ),
            },
            {
              label: "Members",
              element: (
                <div className="flex flex-col lg:flex-row gap-12 lg:*:w-1/2">
                  <UsersForm />
                  <UsersList />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
