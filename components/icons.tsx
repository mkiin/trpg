import {
  CircleStop,
  GalleryVerticalEnd,
  Pencil,
  Sparkles,
  Home,
  UserRoundCog,
  ArrowBigUp,
  PanelLeft,
} from "lucide-react";

export const AppIcon = () => {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <GalleryVerticalEnd size={14} />
    </div>
  );
};

export const HomeIcon = ({ size = 16 }: { size?: number }) => (
  <Home size={size} />
);

export const UserSettingsIcon = ({ size = 16 }: { size?: number }) => (
  <UserRoundCog size={size} />
);

export const SidebarLeftIcon = ({ size = 16 }: { size?: number }) => (
  <PanelLeft size={size} />
);

export const ArrowUpIcon = ({ size = 16 }: { size?: number }) => (
  <ArrowBigUp size={size} />
);

export const StopIcon = ({ size = 16 }: { size?: number }) => (
  <CircleStop size={size} />
);

export const PencilEditIcon = ({ size = 16 }: { size?: number }) => (
  <Pencil size={size} />
);

export const SparklesIcon = ({ size = 16 }: { size?: number }) => (
  <Sparkles size={size} />
);
