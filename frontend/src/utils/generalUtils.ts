import moment from "moment";

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

export const generateUniqueCode = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabc0123456789defghijkUVWXYZabc01234lmnopqrstuvwxyz0123456789JKLMNOPQRSTUV";
  const length = 6;
  let code: string;

  code = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");

  return code;
};
