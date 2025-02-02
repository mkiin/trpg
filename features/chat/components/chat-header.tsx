"use client";

import { SidebarToggle } from "@/features/sidebar/sidebar-toggle";
import { useSidebar } from "@/components/ui/sidebar";

export default function ChatHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
      <SidebarToggle />
    </header>
  );
}
