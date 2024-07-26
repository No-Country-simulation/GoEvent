import moment from "moment";
import { EventStatus } from "../types";
import { Id } from "react-beautiful-dnd";
import { updateEvent } from "../services";

export const dateFormat = (dateISO: string | undefined) => {
  if (!dateISO) return "No disponible";
  const date = moment(dateISO);

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return `${days[date.day()]} ${date.date()} de ${months[date.month()]}`;
};

// Verifica si la fecha actual es la misma que la del evento, y si es así
// cambia su estado a "En curso"
// Si el estado del evento es "En curso" pero su fecha es distinta a la actual
// cambia su estado por "Completado"

export const eventIsToday = async (
  dateISO: string,
  eventState: string,
  eventId: string,
) => {
  let today = moment().format("YYYY-MM-DD");
  let eventDate = moment(dateISO).format("YYYY-MM-DD");

  if (eventState === EventStatus.SCHEDULED) {
    if (today === eventDate) {
      await updateEvent({ id: eventId, status: EventStatus.ONGOING });
    }
  } else if (eventState === EventStatus.ONGOING) {
    if (today !== eventDate) {
      await updateEvent({ id: eventId, status: EventStatus.COMPLETED });
    }
  }
};
