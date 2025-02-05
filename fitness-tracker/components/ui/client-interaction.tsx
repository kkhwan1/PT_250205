"use client"
// 클라이언트 컴포넌트
export function ClientInteraction({ data }: { data: any }) {
  // 클라이언트 사이드 로직
  return (
    <button onClick={() => console.log(data)}>
      클라이언트 인터랙션
    </button>
  )
} 