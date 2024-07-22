import React, { useState } from "react";
import { EventType } from "../../types";
import { dateFormat } from "../../utils";
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

  let { name, date, time, id } = eventData;
  return (
    <div className="border-2 border-red-600">
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h3>{name}</h3>
        <time dateTime={date}>
          {dateFormat(date)} comienza: {time.slice(0, 5)} hs
        </time>
        <address>Chacabuco 123, CABA.</address>
        <p>Invitaciones enviadas</p>
      </div>
      <div>
        <div>
          <button onClick={() => navigate(`/evento/${id}`)}>Gestionar</button>
          <button onClick={() => setIsOpenScanner(true)}>Escanear QR</button>
        </div>
        <button onClick={() => handleDeleteEvent(id)}>Eliminar evento</button>
      </div>
      {isOpenScanner && <QrScanner eventId={id} />}
    </div>
  );
};

export default EventCard;
