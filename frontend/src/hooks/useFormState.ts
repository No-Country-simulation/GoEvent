import { useState } from "react";

// hook creado para el control y actualizacion de la informacion de un formulario
// toma un objeto con el cual crear un estado y retorna la funcion para modificar este
// estado y su estado actual

export const useFormState = <T>(data: T) => {
  const [formData, setFormData] = useState<T>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleChange };
};
