"use client";

interface AgendaDay {
  label: string;
  dayNumber: number;
  isToday: boolean;
}

interface AgendaEvent {
  day: string;
  time: string;
  client: string;
  service: string;
  serviceType: string;
  status: string;
}

interface AgendaEstoqueFinanceiroSectionProps {
  agendaDays: AgendaDay[];
  agendaTimeSlots: string[];
  agendaEvents: AgendaEvent[];
}

export function AgendaEstoqueFinanceiroSection({
  agendaDays,
  agendaTimeSlots,
  agendaEvents,
}: AgendaEstoqueFinanceiroSectionProps) {
  return <section id="agenda-estoque-financeiro"><h2>Agenda, Estoque e Financeiro</h2></section>;
}
