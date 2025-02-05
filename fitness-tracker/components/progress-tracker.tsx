"use client"

import { HumanBody } from "@/components/human-body"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const measurements = [
  {
    date: "10/1",
    weight: "65.5",
    bodyFat: "25.2",
    muscle: "28.8",
    bmi: "22.1",
  },
  {
    date: "10/7",
    weight: "66.7",
    bodyFat: "23.2",
    muscle: "28.0",
    bmi: "22.3",
  },
  {
    date: "10/14",
    weight: "67.5",
    bodyFat: "21.5",
    muscle: "28.5",
    bmi: "22.5",
  },
]

export function ProgressTracker() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>신체 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <HumanBody />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>측정 기록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead>체중(kg)</TableHead>
                <TableHead>체지방률(%)</TableHead>
                <TableHead>근육량(kg)</TableHead>
                <TableHead>BMI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.map((measurement) => (
                <TableRow key={measurement.date}>
                  <TableCell>{measurement.date}</TableCell>
                  <TableCell>{measurement.weight}</TableCell>
                  <TableCell>{measurement.bodyFat}</TableCell>
                  <TableCell>{measurement.muscle}</TableCell>
                  <TableCell>{measurement.bmi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

