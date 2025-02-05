// 서버 컴포넌트
import { ClientInteraction } from "./client-interaction"

export function HybridComponent({ data }) {
  // 서버에서 데이터 처리
  const processedData = heavyProcessing(data)
  
  return (
    <div>
      <h1>서버에서 렌더링된 부분</h1>
      <ClientInteraction data={processedData} />
    </div>
  )
} 