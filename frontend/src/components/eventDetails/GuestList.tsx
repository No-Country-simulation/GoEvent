import { useEffect, useState } from "react";
import { createInvitation, getAllGuests, deleteGuest } from "../../services";
import { Guest2Type } from "../../types";

const GuestList = ({ event_id }: { event_id: string }) => {
  const [allGuests, setAllGuests] = useState<Guest2Type[]>([]);

  const getGuests = async () => {
    let response = await getAllGuests();

    if (response.success) setAllGuests(response.data);
    else alert("No se pudieron obtener los invitados");
  };

  const addGuestToEvent = async (guest_id: string) => {
    let response = await createInvitation({ event_id, guest_id });
  
    if (response.success) {
      // Actualiza la lista de invitados para eliminar el invitado agregado
      setAllGuests(allGuests.filter((guest) => guest.id !== guest_id));
      alert("Invitado agregado correctamente");
    } else {
      alert("No se pudo agregar el invitado");
    }
  };
  

  const removeGuest = async (guest_id: string) => {
    let response = await deleteGuest(guest_id);
  
    if (response.success) {
      // Actualiza la lista de invitados para reflejar la eliminación
      setAllGuests(allGuests.filter((guest) => guest.id !== guest_id));
      alert("Invitado eliminado correctamente");
    } else {
      alert("No se pudo eliminar el invitado");
    }
  };
  

  useEffect(() => {
    getGuests();
  }, []);


  return (
    <div>
      <ul className="p-4 rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]">
        {allGuests.map((e: Guest2Type) => (
          <li key={e.id} className="p-2 flex justify-between">
            <div>
              {e.fullname} - {e.email}
            </div>
            <div className="space-x-4">
              <button onClick={() => addGuestToEvent(e.id)}>Agregar a evento</button>
              <button onClick={() => removeGuest(e.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
