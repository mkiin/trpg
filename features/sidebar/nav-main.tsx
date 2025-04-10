"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "lucide-react";

export function NavMain({ items }: { items: any[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <AddSessionButton />

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const addSessionButtonVariants = cva(
  "peer/menu-button relative flex w-full items-center overflow-hidden rounded-lg border-2 p-2 text-sm outline-hidden transition-[width,height,padding] mb-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:opacity-0 group-data-[state=collapsed]:[&>svg]:opacity-100",
  {
    variants: {
      variant: {
        default: [
          // コンテナの基本スタイル
          "justify-center",
          // SVGのスタイリング
          "[&>svg]:absolute [&>svg]:left-1/2 [&>svg]:-translate-x-1/2",
          // 展開時のスタイル（spanを中央に）
          "[&>span]:w-full [&>span]:text-center",
          // 閉じた時のスタイル（spanを非表示に）
          "group-data-[state=collapsed]:[&>span]:hidden",
          // 閉じた時のSVGスタイル
          "group-data-[state=collapsed]:[&>svg]:static group-data-[state=collapsed]:[&>svg]:translate-x-0",
        ],
        outline: [
          "justify-center",
          "[&>svg]:absolute [&>svg]:left-1/2 [&>svg]:-translate-x-1/2",
          "[&>span]:w-full [&>span]:text-center",
          "group-data-[state=collapsed]:[&>span]:hidden",
          "group-data-[state=collapsed]:[&>svg]:static group-data-[state=collapsed]:[&>svg]:translate-x-0",
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        ],
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const AddSessionButton = ({
  isActive = false,
  variant = "default",
  size = "default",
  className,
  ref,
  ...props
}: React.ComponentProps<"a"> & {
  isActive?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
} & VariantProps<typeof addSessionButtonVariants>) => {
  const { isMobile, state } = useSidebar();

  const button = (
    <Link
      ref={ref}
      href="/chat"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(addSessionButtonVariants({ variant, size }), className)}
      {...props}>
      <PlusIcon />
      <span>新しいセッション</span>
    </Link>
  );

  // 固定のツールチップ内容を設定
  const tooltipContent = {
    children: "メニューを開く", // 固定の文字列
    side: "right" as const,
    align: "center" as const,
    hidden: state !== "collapsed" || isMobile,
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent {...tooltipContent} />
    </Tooltip>
  );
};
