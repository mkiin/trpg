import { SidebarProvider as ShadcnSidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/sidebar/app-sidebar";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShadcnSidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </ShadcnSidebarProvider>
  );
}