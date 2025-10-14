import { NextResponse } from "next/server"
import { tonnageSeries } from "@/lib/mock"

export async function GET() {
  const base = tonnageSeries(30) // returns {day, tons}
  const series = base.map(({ day, tons }) => {
    const plan = Math.round(tons * 1.05)
    const actual = Math.max(0, Math.round(tons + (Math.random() - 0.4) * 250))
    return { day, actual, plan }
  })
  return NextResponse.json({ series })
}
