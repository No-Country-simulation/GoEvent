import { useAtom } from "jotai";
import { getEvents } from "../../services";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { useEffect, useState } from "react";
import { EventType } from "../../types";
import EventCard from "./EventCard";
import CreateEvent from "./CreateEvent";

const EventManagement = () => {
  let [user] = useAtom(userAtom);
  let [events, setEvents] = useState<EventType[] | []>([]);
  let [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);

  let { id } = getUserDatils(user);

  const getAllEvents = async () => {
    let response = await getEvents(id);
    if (response.success) setEvents(response.data.events);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <div>
        <h2>Mis Eventos</h2>
        <button>x</button>
      </div>
      <div>
        <div>
          <select name="" id=""></select>
          <button onClick={() => setIsCreateEventOpen(true)}>
            Crear Evento Nuevo +
          </button>
        </div>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <EventCard eventData={event} />
            </li>
          ))}
        </ul>
      </div>
      {isCreateEventOpen && <CreateEvent />}
    </div>
  );
};

export default EventManagement;
