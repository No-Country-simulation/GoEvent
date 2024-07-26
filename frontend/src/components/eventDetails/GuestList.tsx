import { useEffect, useState } from "react";
import { createInvitation, getAllGuests } from "../../services";
import { Guest2Type } from "../../types";

const GuestList = ({ event_id }: { event_id: string }) => {
  const [allGuests, setAllGuests] = useState([]);

  const getGuests = async () => {
    let response = await getAllGuests();

    if (response.success) setAllGuests(response.data);
    else alert("No se pudieron obtener los invitados");
  };

  const addGuestToEvent = async (guest_id: string) => {
    let response = await createInvitation({ event_id, guest_id });

    response.success
      ? alert("Invitado agregado correctamente")
      : alert("No se pudo agreagar el invitado");
  };

  useEffect(() => {
    getGuests();
  }, []);
  return (
    <div>
      <ul className="border-2 border-blue-200">
        {allGuests.map((e: Guest2Type) => {
          return (
            <li key={e.id} className="flex justify-between">
              <div>
                {e.fullname}
                {e.email}
              </div>
              <div className="space-x-4">
                <button onClick={() => addGuestToEvent(e.id)}>
                  Agregar a evento
                </button>
                <button>Eliminar</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GuestList;
