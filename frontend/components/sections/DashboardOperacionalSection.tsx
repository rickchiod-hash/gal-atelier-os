"use client";

interface Metrics {
  quotes: number;
  revenuePotential: number;
  depositsPotential: number;
  conversionRate: number;
  avgTicket: number;
}

export function DashboardOperacionalSection({ metrics }: { metrics: Metrics }) {
  return <section id="dashboard"><h2>Dashboard</h2></section>;
}
