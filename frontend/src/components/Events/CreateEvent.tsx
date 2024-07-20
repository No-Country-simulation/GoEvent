import { useFormState } from "../../hooks/useFormState";
import { useAtom } from "jotai";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { createEvent } from "../../services";

const CreateEvent = () => {
  const [user] = useAtom(userAtom);
  const { id } = getUserDatils(user);

  const { formData, handleChange } = useFormState({
    name: "",
    description: "",
    location: "",
    time: "",
    date: "",
    user_id: id,
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createEvent(formData);
    console.log(response);
    if (response.success) {
      alert("El evento ha sido creado correctamente");
      window.location.reload();
    } else alert("Hubo un error al crear el evento");
  };

  return (
    <div className="border-2 border-black">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder="Nombre del evento"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.description}
          placeholder="Descripcion"
          name="description"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.location}
          name="location"
          placeholder="Lugar del evento"
          required
        />
        <input type="time" onChange={handleChange} name="time" required />
        <input type="date" onChange={handleChange} name="date" required />
        <button type="submit"> Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
