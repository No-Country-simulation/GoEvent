import React from "react";
import { useFormState } from "../../hooks/useFormState";
import { GuestType } from "../../types";
import { createGuest } from "../../services";

const CreateGuestForm = () => {
  const { formData, handleChange } = useFormState<GuestType>({
    fullname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await createGuest(formData);
    console.log(response);
    response.success
      ? alert("Invitado agregado correctamente")
      : alert("No se pudo agregar el invitado");
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
        <h2 className="text-2xl font-normal">
          Registrar invitado
        </h2>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Nombre Completo"
          className="p-2 h-[68px] rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 h-[68px] rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]"
          required
        />
        <input
          type=""
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefono"
          className="p-2 h-[68px] rounded-xl border border-[#C2BAA6] bg-[#EBE2CD]"
          required
        />
        <div className="w-full flex justify-center mt-8">
          <button 
            type="submit" 
            className="boton mb-2 h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl hover:bg-orange-500">
              Agregar a la lista
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGuestForm;
