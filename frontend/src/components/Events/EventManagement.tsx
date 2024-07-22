import { useAtom } from "jotai";
import { getEvents } from "../../services";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { useEffect, useState } from "react";
import { EventType } from "../../types";
import Navbar from "../Navbar";
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
      <Navbar />

      <div className="degradado h-screen text-[#0D1512]">
        <div className="flex justify-between px-12">
          <h2 className="mb-4 py-12 text-3xl font-semibold">Mis Eventos</h2>
          <button className="text-3xl text-gray-600">
            <img src="../public/icons/Close.png" alt="" />
          </button>
        </div>
        <div className="px-[200px]">
          {/*Linea filtro y botón crear evento */}

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {/*Filtro tipos de eventos*/}
              <select
                id="filter"
                className="fondo2 orangeshadow w-[576px] rounded-xl border border-gray-300 p-8 text-base"
              >
                <option>Filtrar por: Todos los eventos (1)</option>
              </select>
            </div>

            {/*Botón para crear eventos*/}
            <button
              className="orangeshadow fondo2 flex w-[264px] items-center rounded-md p-4 px-4 text-[#0D1512]"
              onClick={() => setIsCreateEventOpen(true)}
            >
              <p className="ps-5">Crear evento nuevo</p>
              <img src="../public/icons/Multiply.png" alt="" />
            </button>
          </div>
          {/*Card*/}
          <div className="fondo3 mt-[100px] flex items-center justify-between p-6 rounded-xl">
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src="./public/Jamie4.png"
                  alt="Invitation card"
                  className="border-4 border-yellow-300 w[217px] h-[348px]"
                  
                />
              </div>
              <div className="text-xl">
                <h2 className="text-2xl font-bold pb-10">Cumpleaños</h2>
                <p className="mt-2">Viernes 9 de Agosto</p>
                <p className="pb-10">Comienza: 22.00 hs</p>
                <p className="pb-12">Chacabuco 123, CABA.</p>
                <p className="mt-4">Invitaciones enviadas</p>
              </div>
            </div>
            <div className="flex flex-col">
              <button className="boton mb-2 rounded-xl px-4 py-4 text-xl w-[363px] h-[68px] hover:bg-orange-500">
                Gestionar Invitados
              </button>
              <button className="boton mt-3 mb-3 flex text-xl items-center justify-center rounded-xl px-4 py-4 w-[363px] h-[68px] hover:bg-orange-500">
                <img src="./public/Qr_Code.png" alt="" />
                <p className="ps-4">Escanear QR</p>
              </button>
              <button className="flex px-4">
                <p className="text-xl underline decoration-1 pt-[100px] ps-12">Eliminar evento</p>
              </button>
            </div>
          </div>

          <div>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard eventData={event} />
                </li>
              ))}
            </ul>
          </div>
          {isCreateEventOpen && <CreateEvent />}

          {/*Cerrar sesion*/}

          <button className="ps-7 flex pt-[150px]">
            <img src="./public/icons/Logout.png" alt="" />
              <p className="text-xl ps-4 pt-1">Cerrar sesion</p>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
