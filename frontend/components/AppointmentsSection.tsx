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

interface AppointmentsSectionProps {
  agendaDays: AgendaDay[];
  agendaTimeSlots: string[];
  agendaEvents: AgendaEvent[];
}

export function AppointmentsSection({
  agendaDays,
  agendaTimeSlots,
  agendaEvents,
}: AppointmentsSectionProps) {
  return (
    <section id="agenda" className="agenda-section">
      <div className="agenda-header">
        <span className="agenda-eyebrow">Agenda</span>
        <h2>Calendário de Atendimentos</h2>
        <p className="agenda-desc">
          Visualize os próximos agendamentos da semana com horários e status.
        </p>
      </div>

      <div className="agenda-grid-wrapper">
        <div className="agenda-grid">
          {agendaDays.map((day) => (
            <div
              key={day.label}
              className={`agenda-day-header ${day.isToday ? "today" : ""}`}
            >
              <span className="day-name">{day.label}</span>
              <span className="day-number">{day.dayNumber}</span>
              {day.isToday && <span className="today-badge">Hoje</span>}
            </div>
          ))}

          {agendaTimeSlots.map((time) => (
            <div key={`wrapper-${time}`} style={{ display: "contents" }}>
              <div key={`time-${time}`} className="agenda-time-slot">
                <span>{time}</span>
              </div>
              {agendaDays.map((day) => {
                const event = agendaEvents.find(
                  (e) => e.day === day.label && e.time === time
                );
                return (
                  <div
                    key={`${day.label}-${time}`}
                    className={`agenda-cell ${event ? "has-event" : ""}`}
                  >
                    {event && (
                      <div className={`agenda-event service-${event.serviceType}`}>
                        <span className="event-time">{event.time}</span>
                        <strong className="event-client">{event.client}</strong>
                        <span className="event-service">{event.service}</span>
                        <span
                          className={`event-status ${event.status.toLowerCase()}`}
                        >
                          {event.status === "SCHEDULED"
                            ? "Agendado"
                            : "Concluído"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
