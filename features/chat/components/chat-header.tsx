"use client";

import { SidebarToggle } from "@/features/sidebar/sidebar-toggle";

export default function ChatHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
      <SidebarToggle />
    </header>
  );
}
