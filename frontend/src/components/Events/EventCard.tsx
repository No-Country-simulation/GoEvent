import React, { useEffect, useState } from "react";
import { EventStatus, EventType } from "../../types";
import { dateFormat, eventIsToday } from "../../utils";
import { deleteEvent } from "../../services";
import { useNavigate } from "react-router-dom";
import QrScanner from "../QrScanner";
import { toast } from "sonner";

interface PropsEventCard {
  eventData: EventType;
  updateEvents: () => void;
}

const EventCard: React.FC<PropsEventCard> = ({ eventData, updateEvents }) => {
  let navigate = useNavigate();
  let [isOpenScanner, setIsOpenScanner] = useState<boolean>(false);

  const handleDeleteEvent = async (id: string) => {
    let response = await deleteEvent(id);

    if (response.success) {
      toast.success("El evento se ha eliminado correctamente");
      updateEvents();
    } else toast.error("Hubo un error al eliminar el evento");
  };

  let { name, date, time, id, location, description, status, template_image } =
    eventData; // destructuring eventData

  useEffect(() => {
    eventIsToday(date, status, id, updateEvents);
  }, []);
  return (
    <div className="fondo3 mt-[100px] flex justify-between rounded-xl p-6">
      <div className="flex">
        <div className="mr-4">
          <img
            src={template_image || "./defaulEventImg.png"}
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

          <p>Lugar: {location}</p>
        </div>
      </div>
      <div className="flex flex-col items-center py-5">
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
          <p className="pt-[50px] text-xl underline decoration-1">
            Eliminar evento
          </p>
        </button>
      </div>
      {isOpenScanner && (
        <QrScanner eventId={id} closeScanner={setIsOpenScanner} />
      )}
    </div>
  );
};

export default EventCard;
