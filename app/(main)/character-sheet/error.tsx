'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function CharacterSheetError({
  error,
  reset,
}: {
  error: globalThis.Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Character Sheet Error:', error)
  }, [error])

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            キャラクターシート生成エラー
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            キャラクターシートの生成中にエラーが発生しました。
            しばらく待ってから再試行してください。
          </p>
          
          {error.message && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800 font-medium">エラー詳細:</p>
              <p className="text-sm text-red-700 mt-1">{error.message}</p>
            </div>
          )}

          {error.digest && (
            <p className="text-xs text-gray-500">
              エラーID: {error.digest}
            </p>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              再試行
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                ホームに戻る
              </Button>
            </Link>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              技術的な詳細を表示
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}