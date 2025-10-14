export function kpis() {
  return [
    {
      label: "Cost per ton-km",
      value: `₹${(1.8 + Math.random() * 0.5).toFixed(2)}`,
      delta: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 4).toFixed(1)}%`,
    },
    {
      label: "On-time delivery",
      value: `${(95 + Math.random() * 3).toFixed(1)}%`,
      delta: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 2).toFixed(1)}%`,
    },
    {
      label: "Wagon utilization",
      value: `${(84 + Math.random() * 4).toFixed(1)}%`,
      delta: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 2).toFixed(1)}%`,
    },
    {
      label: "Demurrage cost",
      value: `${(1.4 + Math.random() * 0.7).toFixed(1)}%`,
      delta: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 1).toFixed(1)}%`,
    },
  ]
}

export function tonnageSeries(days = 30) {
  const res = []
  for (let i = days - 1; i >= 0; i--) {
    res.push({
      day: `D-${i}`,
      tons: 2000 + Math.round(600 * Math.sin((days - i) / 3) + Math.random() * 300),
    })
  }
  return res
}

export function rakes() {
  const statuses = ["LOADING", "IN_TRANSIT", "ARRIVED"] as const
  const materials = ["Hot Rolled Coils", "TMT Bars", "Billets", "Wire Rods"]
  const destinations = ["CMO Kolkata", "CMO Delhi", "CMO Ranchi", "Customer - Pune"]
  const origins = ["Bokaro", "Rourkela", "Durgapur"]

  return Array.from({ length: 8 }).map((_, i) => ({
    id: `R${100 + i}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    wagonCount: 45 + Math.floor(Math.random() * 10),
    origin: origins[Math.floor(Math.random() * origins.length)],
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    eta: `${1 + Math.floor(Math.random() * 3)}d`,
  }))
}

export function events() {
  const msgs = [
    "Delay reported near Gomoh Junction",
    "Loading point MH-2 reached capacity threshold",
    "FOIS update: BOXN wagons available +12",
    "Weather alert: heavy rain expected on route to Kolkata",
    "ERP: urgent order priority raised (Customer X)",
  ]
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `E${i}`,
    time: new Date(Date.now() - i * 1000 * 60).toLocaleTimeString(),
    kind: Math.random() > 0.7 ? "ALERT" : "INFO",
    message: msgs[Math.floor(Math.random() * msgs.length)],
  }))
}

export function orders() {
  const customers = ["Customer A", "Customer B", "Customer C", "Depot North", "Stockyard East"]
  const materials = ["Hot Rolled Coils", "TMT Bars", "Billets", "Wire Rods", "CR Sheets"]
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `O${1000 + i}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    tons: 50 + Math.floor(Math.random() * 80),
    due: `${2 + Math.floor(Math.random() * 6)}d`,
  }))
}
