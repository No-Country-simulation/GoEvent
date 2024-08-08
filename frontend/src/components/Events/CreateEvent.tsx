import { useFormState } from "../../hooks/useFormState";
import { useAtom } from "jotai";
import { selectedEventAtom, userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { createEvent } from "../../services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { closeIcon } from "../../utils";
import { useEffect } from "react";

interface CreateEventProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEvent: React.FC<CreateEventProps> = ({ closeModal }) => {
  const [user] = useAtom(userAtom);
  const [, seletEventAtom] = useAtom(selectedEventAtom);
  const { id } = getUserDatils(user);
  const navigate = useNavigate();

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

    if (response.success) {
      toast.success("El evento se ha creado correctamente");
      seletEventAtom(response.data.event);
      navigate("/template-selector");
    } else toast.error("Hubo un error al crear el evento");
  };

  useEffect(() => {}, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="degradado z-50 flex w-full max-w-[600px] flex-col space-y-3 rounded-xl p-5"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-3xl font-bold">Crear Evento</h3>
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={() => closeModal(false)}
            className="cursor-pointer"
          />
        </div>
        <input
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder="Nombre del evento"
          className="inputStyle py-3"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.description}
          placeholder="Descripcion"
          name="description"
          className="inputStyle py-3"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.location}
          name="location"
          placeholder="Lugar del evento"
          className="inputStyle py-3"
          required
        />
        <div className="flex space-x-3 pb-5">
          <input
            type="time"
            onChange={handleChange}
            name="time"
            required
            className="inputStyle w-full"
          />
          <input
            type="date"
            onChange={handleChange}
            name="date"
            required
            className="inputStyle py-3"
          />
        </div>

        <button
          type="submit"
          className="boton rounded-lg py-3 text-xl font-semibold"
        >
          {" "}
          Crear
        </button>
      </form>
      <div className="fixed inset-0 bg-black opacity-40"></div>
    </div>
  );
};

export default CreateEvent;
