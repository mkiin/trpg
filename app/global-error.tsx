'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: globalThis.Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-6 w-6" />
                アプリケーションエラー
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                予期しないエラーが発生しました。
                ページを再読み込みしてください。
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

              <Button onClick={reset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                アプリを再起動
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}