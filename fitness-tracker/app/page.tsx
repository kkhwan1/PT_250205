import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">
              피트니스 트래커에 오신 것을 환영합니다
            </CardTitle>
            <CardDescription className="text-xl mt-2">
              건강한 라이프스타일을 시작해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mt-6">
              <Button asChild size="lg" className="w-full">
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/register">회원가입</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 