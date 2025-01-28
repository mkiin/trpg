import { Button } from "@/components/ui/button";
import React from "react";

export function LoginButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>;
}
