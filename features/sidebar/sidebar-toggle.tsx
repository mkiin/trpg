import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SidebarLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

function PureSidebarToggle({
  className,
  ref,
  ...props
}: ComponentProps<typeof Button> & { ref?: React.ElementRef<typeof Button> }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant="outline"
      className={cn("h-fit w-7", className)}
      {...props}>
      <SidebarLeftIcon size={16} />
    </Button>
  );
}

export const SidebarToggle = React.memo(PureSidebarToggle);
