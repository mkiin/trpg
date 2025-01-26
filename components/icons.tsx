import { GalleryVerticalEnd } from "lucide-react";

export {
  Home,
  Inbox,
  Search,
  UserRoundCog,
  GalleryVerticalEnd,
} from "lucide-react";

const AppIcon = () => {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <GalleryVerticalEnd size={14} />
    </div>
  );
};

export { AppIcon };
