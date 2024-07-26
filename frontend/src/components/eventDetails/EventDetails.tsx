import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { userAtom,selectedEventAtom } from "../../context/atoms";
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
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils";

const EventDetails = () => {
  const [user] = useAtom(userAtom);
  const { id } = getUserDatils(user);
  const [event, setEvent] = useAtom(selectedEventAtom);
  const [guestByEvent, setGuestByEvent] = useState([]);
  const [isOpenCreateGuest, setIsOpenCreateGuest] = useState<boolean>(false);
  const [isOpenGuestList, setIsOpenGuestList] = useState<boolean>(false);
  const navigate = useNavigate();

  const { eventId } = useParams();

  const getEvent = async () => {
    const response = await getOneEvent(id, eventId);
    if (response.success) {
      setEvent(response.data);
      getAllGuestsOfEvent(eventId || "");
    } else alert(response.error);
  };

  const getAllGuestsOfEvent = async (eventId: string) => {
    const response = await getGuestsOfEvent(eventId);

    if (response.success) setGuestByEvent(response.data.guests);
  };

  const sendAllInvitations = async () => {
    if (eventId) {
      const response = await sendInvitationByEvent(eventId);
      console.log(response);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <div className="fondo3 mt-[100px] flex items-center justify-between rounded-xl p-6">
      <div className="flex items-center">
        <div className="mr-4">
          <img
            src={event.template_image}
            alt="Invitation card"
            className="w[217px] h-[348px] border-4 border-yellow-300"
          />
        </div>
        <div className="text-xl">
          <h2 className="pb-10 text-2xl font-bold">{event?.name}</h2>
          <p className="py-5">Detalles: {event?.description}</p>
          <time dateTime={event?.date}>
            Fecha: {dateFormat(event.date)} 
            <p>comienza: {event?.time.slice(0, 5)} hs</p>
          </time>
          
          
          <p className="pb-12">Lugar: {event?.location}</p>
          <p className="mt-4">Invitaciones enviadas</p>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          className="boton mb-2 h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl hover:bg-orange-500"
          onClick={() => navigate(`/template-selector`)}
        >
          Editar Invitacion
        </button>
      </div>
    </div>
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
