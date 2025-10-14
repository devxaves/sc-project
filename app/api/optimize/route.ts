import { type NextRequest, NextResponse } from "next/server"

type Order = { id: string; customer: string; material: string; tons: number; due: string }

function greedy(input: Order[]) {
  const suggested = input.slice().sort((a, b) => {
    const dueA = Number.parseInt(a.due)
    const dueB = Number.parseInt(b.due)
    if (dueA !== dueB) return dueA - dueB
    return b.tons - a.tons
  })
  const explanation = [
    "Sorted by earliest due date to reduce lateness.",
    "For equal due dates, prioritized heavier loads first to utilize wagons efficiently.",
  ]
  const score = suggested.reduce((s, o, idx) => s + (Number.parseInt(o.due) || 0) + idx, 0)
  return { suggested, explanation, score }
}

function ga(input: Order[]) {
  // Minimal GA-style shuffle + pick best by simple lateness proxy
  const epochs = 20
  let best = input.slice()
  let bestScore = Number.POSITIVE_INFINITY
  for (let e = 0; e < epochs; e++) {
    const candidate = input.slice().sort(() => Math.random() - 0.5)
    const score = candidate.reduce((s, o, idx) => s + (Number.parseInt(o.due) || 0) * (idx + 1), 0)
    if (score < bestScore) {
      bestScore = score
      best = candidate
    }
  }
  const explanation = [
    "Generated randomized permutations (genetic search) and evaluated a lateness proxy.",
    "Selected the lowest-score ordering as the current best solution.",
  ]
  return { suggested: best, explanation, score: bestScore }
}

function monteCarlo(input: Order[]) {
  // Sample multiple shuffles and pick the best by total "tardiness" proxy
  const trials = 50
  let best = input.slice()
  let bestScore = Number.POSITIVE_INFINITY
  for (let t = 0; t < trials; t++) {
    const candidate = input.slice().sort(() => Math.random() - 0.5)
    const score = candidate.reduce((s, o, idx) => s + Math.max(0, idx + 1 - Number.parseInt(o.due)), 0)
    if (score < bestScore) {
      bestScore = score
      best = candidate
    }
  }
  const explanation = [
    "Ran Monte Carlo sampling over candidate sequences.",
    "Chose the sequence with minimal simulated tardiness.",
  ]
  return { suggested: best, explanation, score: bestScore }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { orders: Order[]; algorithm?: "greedy" | "ga" | "monteCarlo" }
  const input = Array.isArray(body?.orders) ? body.orders : []
  const algo = body.algorithm || "greedy"

  const result = algo === "ga" ? ga(input) : algo === "monteCarlo" ? monteCarlo(input) : greedy(input)

  return NextResponse.json(result)
}
