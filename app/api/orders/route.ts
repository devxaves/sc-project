import { NextResponse } from "next/server"
import { orders } from "@/lib/mock"

export async function GET() {
  return NextResponse.json({ orders: orders() })
}
