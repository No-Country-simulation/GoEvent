import { useAtom } from "jotai";
import { filterEvents, getEvents } from "../../services";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { ChangeEvent, useEffect, useState } from "react";
import { EventStatus, EventType } from "../../types";
import Navbar from "../Navbar";
import EventCard from "./EventCard";
import CreateEvent from "./CreateEvent";
import UserMenu from "../home/UserMenu";

const EventManagement = () => {
  let [user] = useAtom(userAtom);
  let [events, setEvents] = useState<EventType[] | []>([]);
  let [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);

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

  return (
    <div>
      <Navbar openMenu={setIsOpenMenu} />
      {!isOpenMenu ? (
        <div className="degradado h-fit-content pb-12 text-[#0D1512]">
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

            <button className="flex ps-7 pt-[150px]">
              <img src="./public/icons/Logout.png" alt="" />
              <p className="ps-4 pt-1 text-xl">Cerrar sesion</p>
            </button>
          </div>
        </div>
      ) : (
        <UserMenu closeMenu={setIsOpenMenu} />
      )}
    </div>
  );
};

export default EventManagement;
