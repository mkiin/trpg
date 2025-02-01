import ChatPageHeader from "@/features/chat/components/chat-header";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatPageHeader />
      <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
    </>
  );
}
