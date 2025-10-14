import { NextResponse } from "next/server"
import { rakes } from "@/lib/mock"

export async function GET() {
  return NextResponse.json({ rakes: rakes() })
}
