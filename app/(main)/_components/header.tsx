import { AppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <Link href={"/"}>
        <AppIcon />
      </Link>
      <div className="flex gap-4">
        <Link href={"/"}>
          <Button className="h-7">Home</Button>
        </Link>
        <Link href={"/"}>
          <Button variant={"outline"} className="h-7">
            Home
          </Button>
        </Link>
      </div>
    </header>
  );
}
