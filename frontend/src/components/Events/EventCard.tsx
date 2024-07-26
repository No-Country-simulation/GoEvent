import React, { useState } from "react";
import { EventStatus, EventType } from "../../types";
import { dateFormat, eventIsToday } from "../../utils";
import { deleteEvent } from "../../services";
import { useNavigate } from "react-router-dom";
import QrScanner from "../QrScanner";

interface PropsEventCard {
  eventData: EventType;
}

const EventCard: React.FC<PropsEventCard> = ({ eventData }) => {
  let navigate = useNavigate();
  let [isOpenScanner, setIsOpenScanner] = useState<boolean>(false);

  const handleDeleteEvent = async (id: string) => {
    let response = await deleteEvent(id);

    if (response.success) {
      alert("El evento ha sido eliminado correctamente");
      window.location.reload();
    } else alert("Hubo un error al eliminar el evento");
  };

  let { name, date, time, id, location, description, status } = eventData; // destructuring eventData
  return (
    <div className="fondo3 mt-[100px] flex items-center justify-between rounded-xl p-6">
      <div className="flex items-center">
        <div className="mr-4">
          <img
            src="./public/Jamie4.png"
            alt="Invitation card"
            className="w[217px] h-[348px] border-4 border-yellow-300"
          />
        </div>
        <div className="text-xl">
          <h2 className="pb-10 text-2xl font-bold">{name}</h2>
          <p className="py-5">Detalles: {description}</p>
          <time dateTime={date}>
            Fecha: {dateFormat(date)}
            <p>comienza: {time.slice(0, 5)} hs</p>
          </time>

          <p className="pb-12">Lugar: {location}</p>
          <p className="mt-4">Invitaciones enviadas</p>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          className="boton mb-2 h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl hover:bg-orange-500"
          onClick={() => navigate(`/evento/${id}`)}
        >
          Gestionar Invitados
        </button>
        {status === EventStatus.ONGOING && (
          <button
            onClick={() => setIsOpenScanner(true)}
            className="boton mb-3 mt-3 flex h-[68px] w-[363px] items-center justify-center rounded-xl px-4 py-4 text-xl hover:bg-orange-500"
          >
            <img src="./public/Qr_Code.png" alt="" />
            <p className="ps-4">Escanear QR</p>
          </button>
        )}
        <button className="flex px-4" onClick={() => handleDeleteEvent(id)}>
          <p className="ps-12 pt-[100px] text-xl underline decoration-1">
            Eliminar evento
          </p>
        </button>
      </div>
      {isOpenScanner && (
        <QrScanner eventId={id} closeScanner={setIsOpenScanner} />
      )}
      <button onClick={() => eventIsToday(date, status, id)}>Pruebas </button>
    </div>
  );
};

export default EventCard;
