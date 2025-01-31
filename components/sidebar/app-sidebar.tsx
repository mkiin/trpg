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
import { AppIcon, HomeIcon, UserSettingsIcon } from "@/components/icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { SidebarToggle } from "./sidebar-toggle";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    title: "Session",
    url: "/chat",
    icon: HomeIcon,
  },
  {
    title: "CharacterSheet",
    url: "/character-sheet",
    icon: UserSettingsIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center w-full">
          <AppIcon />
          <SidebarToggle
            className={cn(
              "w-7 h-fit",
              state !== "collapsed" || isMobile ? null : "hidden"
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-3">
                {state !== "collapsed" && (
                  <SidebarMenuButton asChild>
                    <Button>
                      <span>新規セッション</span>
                    </Button>
                  </SidebarMenuButton>
                )}
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
