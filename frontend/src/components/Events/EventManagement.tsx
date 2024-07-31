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
  const classHoverOrange = " transition ease duration-200 hover:bg-orange-300"

  return (
    <div>
      <Navbar openMenu={setIsOpenMenu} />
      {!isOpenMenu ? (
        <div className="degradado min-h-[calc(100vh-60px)] pb-12 font-vietnam text-[#0D1512]">
          <div className="flex justify-between px-20">
            <h2 className="mb-4 py-12 text-3xl font-semibold">Mis Eventos</h2>
          </div>

          <div>
            {/*Linea filtro y botón crear evento */}

            <div className="mb-4 flex md:flex-row flex-col md:gap-0 gap-6 items-center w-full justify-evenly">
              {/*Filtro tipos de eventos*/}
              <div className="w-11/12 md:w-7/12 flex bg- gap-5 items-center justify-evenly">
                <label htmlFor="filter" className="text-xl text-[#0D1512]/50">Filtrar por:</label>
                <select
                  onChange={handleSelect}
                  id="filter"
                  className={"fondo2 orangeshadow rounded-xl border w-8/12 px-5 text-base h-[60px]" + classHoverOrange}
                >
                  <option value={"all"}>Todos los eventos</option>
                  <option value={EventStatus.ONGOING}>
                    En Curso
                  </option>
                  <option value={EventStatus.SCHEDULED}>
                    Proximos{" "}
                  </option>
                  <option value={EventStatus.COMPLETED}>
                    Finalizados
                  </option>
                  <option value={EventStatus.CANCELLED}>
                    Cancelados
                  </option>
                </select>
              </div>
              {/*Botón para crear eventos*/}
              <button
                className={"orangeshadow fondo2 w-auto md:w-3/12 flex items-center justify-center rounded-xl px-3  text-[#0D1512] h-[60px]" + classHoverOrange}
                onClick={() => setIsCreateEventOpen(true)}
              >
                Crear evento nuevo
                <img src="../public/icons/Multiply.png" alt="add-event-icon" className="relative max-w-fit" />
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
            {isCreateEventOpen && (
              <CreateEvent closeModal={setIsCreateEventOpen} />
            )}
          </div>
        </div>
      ) : (
        <UserMenu closeMenu={setIsOpenMenu} />
      )}
    </div>
  );
};

export default EventManagement;
