import { useAtom } from "jotai";
import { filterEvents, getEvents } from "../../services";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EventStatus, EventType } from "../../types";
import Navbar from "../Navbar";
import EventCard from "./EventCard";
import CreateEvent from "./CreateEvent";
import UserMenu from "../home/UserMenu";
import autoAnimate from "@formkit/auto-animate";

const EventManagement = () => {
  const [user] = useAtom(userAtom);
  const [events, setEvents] = useState<EventType[] | []>([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);
  const parent = useRef(null);

  let { id } = getUserDatils(user);

  const getAllEvents = async () => {
    let response = await getEvents(id);
    if (response.success) setEvents(response.data.events);
  };

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    let response = await filterEvents(e.target.value, id);

    if (response.success) setEvents(response.data);
    else alert("Hubo un error al obtener los eventos");
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div>
      <Navbar openMenu={setIsOpenMenu} />
      {!isOpenMenu ? (
        <div className="degradado min-h-[calc(100vh-60px)] pb-12 font-vietnam text-[#0D1512]">
          <div className="flex justify-between px-20">
            <h2 className="mb-4 py-12 text-3xl font-semibold">Mis Eventos</h2>
          </div>
          <div className="px-[200px]">
            {/*Linea filtro y botón crear evento */}

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                {/*Filtro tipos de eventos*/}
                <select
                  onChange={handleSelect}
                  id="filter"
                  className="fondo2 orangeshadow w-[576px] rounded-xl border border-gray-300 p-8 text-base"
                >
                  <option value={"all"}>Filtrar por: Todos los eventos</option>
                  <option value={EventStatus.ONGOING}>
                    Filtrar por: En Curso
                  </option>
                  <option value={EventStatus.SCHEDULED}>
                    Filtrar por: Proximos{" "}
                  </option>
                  <option value={EventStatus.COMPLETED}>
                    Filtrar por: Finalizados
                  </option>
                  <option value={EventStatus.CANCELLED}>
                    Filtrar por: Cancelados
                  </option>
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

            <div>
              <ul ref={parent}>
                {events.map((event) => (
                  <li key={event.id}>
                    <EventCard eventData={event} updateEvents={getAllEvents} />
                  </li>
                ))}
              </ul>
            </div>
            {isCreateEventOpen && <CreateEvent />}
          </div>
        </div>
      ) : (
        <UserMenu closeMenu={setIsOpenMenu} />
      )}
    </div>
  );
};

export default EventManagement;
