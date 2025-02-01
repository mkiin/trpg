"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AppIcon,
  PlusIcon,
  HomeIcon,
  UserSettingsIcon,
} from "@/components/icons";
import Link from "next/link";
import { SidebarToggle } from "./sidebar-toggle";
import { cn } from "@/lib/utils";
import React from "react";

const items = [
  {
    title: "CharacterSheet",
    url: "/character-sheet",
    icon: UserSettingsIcon,
  },
];

function PureAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center w-full space-x-2">
          <div className="h-8 w-8 flex-shrink-0">
            <AppIcon />
          </div>
          <div className="group-[[data-state=collapsed]]:hidden h-8 w-8">
            <SidebarToggle className="h-8 w-8" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-3">
                <SidebarMenuButton asChild>
                  <Link
                    href={"/chat"}
                    className={cn(
                      "flex font-bold bg-primary text-secondary items-center group",
                      state !== "collapsed" ? "justify-center" : ""
                    )}>
                    <PlusIcon
                      className={cn(
                        "flex-shrink-0 transition-opacity duration-200",
                        state !== "collapsed" ? "hidden" : "opacity-100"
                      )}
                    />
                    <div
                      className={cn(
                        "flex-shrink-0 transition-all duration-200",
                        state !== "collapsed"
                          ? "opacity-100 w-auto" // 文字を表示
                          : "opacity-0 w-0 overflow-hidden " // 文字を非表示
                      )}>
                      <span className="">新規セッション</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>最新のチャット</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export const AppSidebar = React.memo(PureAppSidebar);
