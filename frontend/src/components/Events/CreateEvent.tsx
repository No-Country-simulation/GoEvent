import { ChangeEvent, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { useAtom } from "jotai";
import { userAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";

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

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="border-2 border-black">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.description}
          name="description"
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.location}
          name="location"
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
