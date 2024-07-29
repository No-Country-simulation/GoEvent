import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { userAtom, selectedEventAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import {
  getAllGuests,
  getGuestsOfEvent,
  getOneEvent,
  sendInvitationByEvent,
} from "../../services/";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import CreateGuestForm from "./CreateGuestForm";
import GuestList from "./GuestList";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils";
import { EventType } from "../../types";
import Modal from "./modal/Modal";

const EventDetails = () => {
  const [user] = useAtom(userAtom);
  const [, setSelectEvent] = useAtom(selectedEventAtom);
  const { id } = getUserDatils(user);
  const [event, setEvent] = useState<EventType>();
  const [guestByEvent, setGuestByEvent] = useState([]);
  const [isOpenCreateGuest, setIsOpenCreateGuest] = useState<boolean>(false);
  const [, setIsOpenGuestList] = useState<boolean>(false);
  const navigate = useNavigate();

  const { eventId } = useParams();

  // const { name, date, time, location } = event as EventType; //destructuring  event

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

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    getEvent();
  }, []);
  return (
    <div>
      <Navbar openMenu={setIsOpenMenu} />
      {event ? (
        <div className="degradado h-fit-content font-vietnam text-[#0D1512]">
          <h2 className="ps-[150px] pt-8 text-2xl font-normal">
            Gestionar evento
          </h2>
          <div className="px-[100px] py-12">
            <div className="fondo3 h-fit-content rounded-xl pb-2">
              <div className="mt-[48px] flex flex-row p-6">
                <img
                  className="h-[270px] w-[180px]"
                  src="../public/Jamie4.png"
                  alt=""
                />
                <div className="text-base">
                  <h3 className="ps-8 text-xl">{event.name}</h3>
                  <p className="ps-8 pt-8">{dateFormat(event.date)}</p>
                  <p className="ps-8 pt-1">Comienza: {event.time} hs</p>
                  <p className="ps-8 pt-8">{event.location}</p>
                  <div>
                    <button
                      onClick={() => setSelectEvent(event)}
                      className="boton mb-2 ms-8 mt-8 h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl hover:bg-orange-500"
                    >
                      Editar Invitación
                    </button>
                    <button className="ps-12 text-xl underline decoration-1">
                      Eliminar evento
                    </button>
                  </div>
                </div>
              </div>
              <div className="mx-8 mb-10 mt-4 rounded-xl border border-[#C2BAA6] px-3 py-6">
                {/* Línea opciones configuración invitación*/}
                <div className="flex justify-between text-xl">
                  <button
                    className="pr-[200px] hover:text-gray-500"
                    onClick={() => setIsOpenGuestList(true)}
                  >
                    <p>Invitaciones enviadas</p>
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={sendAllInvitations}
                      className="flex items-center hover:text-gray-500"
                    >
                      <img
                        className="h-[25px] w-[25px]"
                        src="../public/icons/SendEmail.png"
                        alt="send email"
                      />
                      <p className="ps-2">Enviar invitaciones</p>
                    </button>
                    <button
                      className="flex items-center hover:text-gray-500"
                      onClick={() => setIsOpenCreateGuest(true)}
                    >
                      <img
                        className="h-[40px] w-[40px]"
                        src="../public/icons/Multiply2.png"
                        alt="plus"
                      />
                      <p className="ps-2">Agregar Invitados</p>
                    </button>
                  </div>
                </div>

                {/* Linea filtro estado Invitados */}
                <div className="flex items-center justify-between pb-5 text-lg text-[#0D1512]">
                  <div className="flex space-x-2">
                    <span>Todos(10)</span>
                    <span>Aceptados(4)</span>
                    <span>Rechazados(4)</span>
                    <span>Sincontestar(2)</span>
                  </div>

                  <div>
                    <img
                      className="relative left-[10px] top-[50px]"
                      src="../public/icons/Search.png"
                      alt=""
                    />
                    <input
                      className="h-[68px] w-[494px] rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]"
                      type="Buscar invitado"
                    />
                  </div>
                </div>

                {/* map Invitados */}

                <div>
                  {guestByEvent.map((guest: any) => {
                    return (
                      <div
                        className="flex justify-between border-b-2 border-[#C2BAA6] py-5"
                        key={guest.guest_id}
                      >
                        <div className="pt-5">
                          <p className="text-xl">{guest.guest_fullname}</p>
                          <p className="pt-3">{guest.guest_email}</p>
                        </div>
                        <div className="flex pt-7">
                          <button className="mx-5">
                            <img
                              className="h-[25px] w-[25px]"
                              src="../public/icons/Pencil.png"
                              alt="edit"
                            />
                          </button>
                          <button className="mr-5 ms-10">
                            <img
                              className="h-[25px] w-[25px]"
                              src="../public/icons/Trash.png"
                              alt="delete"
                            />
                          </button>
                          <span>{guest.invitation_status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={isOpenCreateGuest}
            onClose={() => setIsOpenCreateGuest(false)}
          >
            <div className="flex flex-col space-y-4">
              <CreateGuestForm event_id={eventId || ""} />
              <GuestList event_id={eventId || ""} />
            </div>
          </Modal>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};

export default EventDetails;
