import moment from "moment";
import { EventStatus } from "../types";
import { Id } from "react-beautiful-dnd";
import { updateEvent } from "../services";
import { NavigateFunction } from "react-router-dom";

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
// cambia su estado a "Completado"

export const eventIsToday = async (
  dateISO: string,
  eventState: string,
  eventId: string,
  updateEvents: () => void,
) => {
  let today = moment().format("YYYY-MM-DD");
  let eventDate = moment(dateISO).format("YYYY-MM-DD");

  if (eventState === EventStatus.SCHEDULED) {
    if (today === eventDate) {
      await updateEvent({ id: eventId, status: EventStatus.ONGOING });
      updateEvents();
    }
  } else if (eventState === EventStatus.ONGOING) {
    if (today !== eventDate) {
      await updateEvent({ id: eventId, status: EventStatus.COMPLETED });
      updateEvents();
    }
  }
};

export const closeSesion = (navigate: NavigateFunction, setUser: any) => {
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login");
};
