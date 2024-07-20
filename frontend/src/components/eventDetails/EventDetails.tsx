import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { getOneEvent } from "../../services";
import { useEffect, useState } from "react";
import { EventType } from "../../types";

const EventDetails = () => {
  let [user] = useAtom(userAtom);
  let { id } = getUserDatils(user);
  let [event, setEvent] = useState<EventType | {}>({});
  let [guestByEvent, setGuestByEvent] = useState([]);

  let { eventId } = useParams();

  let getEvent = async () => {
    let response = await getOneEvent(id, eventId);
    if (response.success) {
      setEvent(response.data);
    } else alert(response.error);
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <pre className="border-2 border-red-400">
        {JSON.stringify(event, null, 2)}
      </pre>
      <div>
        <div className="flex justify-between">
          <p>Invitaciones enviadas</p>
          <div className="space-x-4">
            <button>Opciones de invitados</button>
            <button>Enviar mensaje</button>
            <button>Agregar invitados</button>
          </div>
        </div>
        <div className="border-2 border-blue-900"></div>
      </div>
    </div>
  );
};

export default EventDetails;
