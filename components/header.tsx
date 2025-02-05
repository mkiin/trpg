import { AppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <Link href={"/"}>
        <AppIcon />
      </Link>
      <div className="flex gap-4">
        <Button variant={"default"} size={"default"} className="h-6" asChild>
          <Link href={"/"}>ログイン</Link>
        </Button>

        <Button variant={"outline"} size={"sm"} className="h-7" asChild>
          <Link href={"/"}>新規登録</Link>
        </Button>
      </div>
    </header>
  );
}
