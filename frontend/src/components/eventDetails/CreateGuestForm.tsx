import React from "react";
import { useFormState } from "../../hooks/useFormState";
import { GuestType } from "../../types";

const CreateGuestForm = () => {
  const { formData, handleChange } = useFormState<GuestType>({
    fullname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Nombre Completo"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type=""
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefono"
          required
        />
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
};
