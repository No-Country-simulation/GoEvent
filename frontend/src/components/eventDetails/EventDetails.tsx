import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import {
  getAllGuests,
  getGuestsOfEvent,
  getOneEvent,
  sendInvitationByEvent,
} from "../../services";
import { useEffect, useState } from "react";
import { EventType } from "../../types";
import CreateGuestForm from "./CreateGuestForm";
import GuestList from "./GuestList";

const EventDetails = () => {
  let [user] = useAtom(userAtom);
  let { id } = getUserDatils(user);
  let [event, setEvent] = useState<EventType | {}>({});
  let [guestByEvent, setGuestByEvent] = useState([]);
  let [isOpenCreateGuest, setIsOpenCreateGuest] = useState<boolean>(false);
  let [isOpenGuestList, setIsOpenGuestList] = useState<boolean>(false);

  let { eventId } = useParams();

  let getEvent = async () => {
    let response = await getOneEvent(id, eventId);
    if (response.success) {
      setEvent(response.data);
      getAllGuestsOfEvent(eventId || "");
    } else alert(response.error);
  };

  let getAllGuestsOfEvent = async (eventId: string) => {
    let response = await getGuestsOfEvent(eventId);

    if (response.success) setGuestByEvent(response.data.guests);
  };

  const sendAllInvitations = async () => {
    if (eventId) {
      let response = await sendInvitationByEvent(eventId);
      console.log(response);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <pre className="border-2 border-red-400 h-fit-content">
        {JSON.stringify(event, null, 2)}
      </pre>
      <div>
        <div className="flex justify-between">
          <p>Invitaciones enviadas</p>
          <div className="space-x-4">
            <button onClick={() => setIsOpenGuestList(true)}>
              Opciones de invitados
            </button>
            <button onClick={sendAllInvitations}>Enviar mensaje</button>
            <button onClick={() => setIsOpenCreateGuest(true)}>
              Agregar invitados
            </button>
          </div>
        </div>
        <div className="border-2 border-blue-900"></div>
      </div>

      {isOpenCreateGuest && <CreateGuestForm />}
      {isOpenGuestList && <GuestList event_id={eventId || ""} />}
      <div>
        <pre>{JSON.stringify(guestByEvent, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EventDetails;
