import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileQuestion, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-600">
            <FileQuestion className="h-6 w-6" />
            ページが見つかりません
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            お探しのキャラクターシートページは見つかりませんでした。
            URLをご確認いただくか、ホームページからアクセスしてください。
          </p>
          
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              ホームに戻る
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}