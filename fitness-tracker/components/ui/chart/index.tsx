import { processChartData } from "@/lib/utils/chart"
import { ChartContainer } from "./chart-client"

export function Chart({ data, ...props }) {
  // 서버에서 데이터 처리
  const processedData = processChartData(data)
  
  return <ChartContainer data={processedData} {...props} />
} 