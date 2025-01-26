import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistSans } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TRPG Tools",
  description: "Generated by ITOU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark" style={{ colorScheme: "dark" }}>
      <body className={cn("bg-background font-sans antialiased", geistSans)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
