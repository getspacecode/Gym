"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed backdrop-blur-md flex items-center justify-center w-full h-full">
      <Loader2 className="w-8 h-8 animate-spin text-muted" />
    </div>
  );
}
