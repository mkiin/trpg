import ChatPageHeader from "@/features/chat/components/chat-header";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div role="presentation" className="flex flex-1 h-full flex-col">
      <ChatPageHeader />
      {children}
    </div>
  );
}
