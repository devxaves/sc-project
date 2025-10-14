import { NextResponse } from "next/server"
import { kpis } from "@/lib/mock"

export async function GET() {
  return NextResponse.json({ kpis: kpis() })
}
