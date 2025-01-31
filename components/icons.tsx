import {
  CircleStop,
  GalleryVerticalEnd,
  Pencil,
  Sparkles,
  Home,
  UserRoundCog,
  ArrowBigUp,
  PanelLeft,
  Plus,
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

export const ArrowUpIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const StopIcon = ({
  size = 16,
  className,
}: {
  size?: number;
  className: string;
}) => <CircleStop size={size} className={className} />;

export const PencilEditIcon = ({ size = 16 }: { size?: number }) => (
  <Pencil size={size} />
);

export const SparklesIcon = ({ size = 16 }: { size?: number }) => (
  <Sparkles size={size} />
);

export const PlusIcon = ({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) => <Plus size={size} className={className} />;
