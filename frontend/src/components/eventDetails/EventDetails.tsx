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
import { EventType } from "../../types";
import CreateGuestForm from "./CreateGuestForm";
import GuestList from "./GuestList";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils";
import Modal from "./modal/Modal";

const EventDetails = () => {
  const [user] = useAtom(userAtom);
  const { id } = getUserDatils(user);
  const [event, setEvent] = useAtom(selectedEventAtom);
  const [guestByEvent, setGuestByEvent] = useState([]);
  const [isOpenCreateGuest, setIsOpenCreateGuest] = useState<boolean>(false);
  const [isOpenGuestList, setIsOpenGuestList] = useState<boolean>(false);
  const navigate = useNavigate();

  const { eventId } = useParams();

  let { name, date, time, location } = event; //destructuring  event
  


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
      <div className="font-vietnam degradado h-fit-content text-[#0D1512]">
        <h2 className="ps-[150px] pt-8 text-2xl font-normal">
          Gestionar evento
        </h2>
        <div className="px-[200px] py-12">
          <div className="fondo3 h-fit-content rounded-xl pb-2">
            <div className="mt-[48px] flex flex-row p-6">
              <img
                className="h-[268px] w-[177px]"
                src="../public/Jamie4.png"
                alt=""
              />
              <div className="">
                <h3 className="ps-8 text-xl">{name}</h3>
                <p className="ps-8 pt-8 text-base">{dateFormat(date)}</p>
                <p className="ps-8 pt-1 text-base">
                  Comienza: {time} hs
                </p>
                <p className="ps-8 pt-8 text-base">{location}</p>
                <div>
                  <button className="boton mb-2 ms-8 mt-8 h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl hover:bg-orange-500">
                    Editar Invitación
                  </button>
                  <button className="ps-12 text-xl underline decoration-1">
                    Eliminar evento
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-8 mt-4 mb-10 rounded-xl border border-[#C2BAA6] px-3 py-6">
             
              {/* Línea opciones configuración invitación*/}
              <div className="flex justify-between text-2xl">
                <button className="pr-[200px] hover:text-gray-500"
                onClick={() => setIsOpenGuestList(true)}>
                  <p>Invitaciones enviadas</p>
                </button>
                <button className="flex hover:text-gray-500">
                  <img
                    className="h-[25px] w-[25px]"
                    src="../public/icons/Settings.png"
                    alt="settings"
                  />
                  <p className="ps-2">Opciones de Invitados</p>
                </button>
                <button className="flex hover:text-gray-500">
                  <img
                    className="h-[25px] w-[25px]"
                    src="../public/icons/SendEmail.png"
                    alt="send email"
                  />
                  <p className="ps-2">Enviar Mensaje</p>
                </button>
                <button className="flex hover:text-gray-500"
                onClick={() => setIsOpenCreateGuest(true)}>
                  <img
                    className="h-[40px] w-[40px] pb-2"
                    src="../public/icons/Multiply2.png"
                    alt="plus"
                  />
                  <p className="ps-2">Agregar Invitados</p>
                </button>
              </div>

              {/* Linea filtro estado Invitados */}
              <div className="flex justify-between text-xl text-[#0D1512] pb-5">
                <button className="mt-[70px] hover:font-bold hover:text-gray-600 hover:underline"
                onClick={() => setIsOpenGuestList(true)}
                >
                  Opciones de invitados
                </button>
                <button className="ml-4 mt-[70px] hover:font-bold hover:text-gray-600 hover:underline">
                  Enviar mensaje
                </button>
                <button className="ml-4 mt-[70px] hover:font-bold hover:text-gray-600 hover:underline"
                onClick={() => setIsOpenCreateGuest(true)}
                >
                  Agregar invitados
                </button>
                <div>
                  <img
                    className="relative left-[10px] top-[85px]"
                    src="../public/icons/Search.png"
                    alt=""
                  />
                  <input
                    className="mt-9 h-[68px] w-[494px] rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]"
                    type="Buscar invitado"
                  />
                </div>
              </div>

              {/* map Invitados */}

              <div>
                {guestByEvent.map((guest) =>{
                  return (
                    <div className="flex justify-between py-5 border-b-2 border-[#C2BAA6]" key={guest.guest_id}>
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
                      <button className="ms-10 mr-5">
                        <img
                          className="h-[25px] w-[25px]"
                          src="../public/icons/Trash.png"
                          alt="delete"
                        />
                      </button>
                    </div>
                  </div>
                  );
                })}

              </div>
                      

            
            </div>
          </div>

        </div>

        <Modal isOpen={isOpenCreateGuest} onClose={() => setIsOpenCreateGuest(false)}>
          <div className="flex flex-col space-y-4">
            <CreateGuestForm />
            <GuestList event_id={eventId || ""} />
          </div>
        </Modal>
        
      </div>
    </div>
  );
};

export default EventDetails;
