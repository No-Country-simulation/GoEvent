import React from "react";
import { EventType } from "../../types";
import { dateFormat } from "../../utils";

interface PropsEventCard {
  eventData: EventType;
}

const EventCard: React.FC<PropsEventCard> = ({ eventData }) => {
  console.log(eventData);
  let { name, date, time } = eventData;
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
          <button>Gestionar</button>
          <button>Escanear QR</button>
        </div>
        <button>Eliminar evento</button>
      </div>
    </div>
  );
};

export default EventCard;
