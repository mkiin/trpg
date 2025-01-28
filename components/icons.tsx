import { GalleryVerticalEnd } from "lucide-react";

export {
  Home,
  Inbox,
  Search,
  UserRoundCog,
  GalleryVerticalEnd,
} from "lucide-react";

export const SidebarLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    height={size}
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width={size}
    style={{ color: "currentcolor" }}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.245 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H6.245V2.5ZM4.995 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H4.995V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1Z"
      fill="currentColor"
    />
  </svg>
);

export const AppIcon = () => {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <GalleryVerticalEnd size={14} />
    </div>
  );
};
