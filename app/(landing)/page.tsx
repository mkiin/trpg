import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background ">
      <main className="flex-col container mx-auto px-4 py-16">
        <h1 className="text-5xl text-balance bg-linear-to-tr mb-5 from-black/70 via-black to-black/60 bg-clip-text text-center font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20 sm:text-5xl md:text-6xl lg:text-7xl">
          TRPGを試す場
        </h1>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-balance pb-2 text-muted-foreground text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
            TRPGのシナリオを試す場です。キャラクターシートを作成し、シナリオを試す事ができます。
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="キャラクターシート作成"
            description="あなただけのユニークなキャラクターを作成しましょう。"
            link="/character-sheet"
            linkText="シート作成"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="セッション開始"
            description="作成したキャラクターでセッションに参加しましょう。"
            link="/chat"
            linkText="セッション開始"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
