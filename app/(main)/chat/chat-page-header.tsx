"use client";

import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function ChatPageHeader() {
  const { open } = useSidebar();
  return (
    <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarToggle className={cn("w-7 h-fit", open ? "hidden" : null)} />
    </header>
  );
}
