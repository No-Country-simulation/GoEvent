import { useState } from "react";

export const useFormState = <T>(data: T) => {
  const [formData, SetFormData] = useState<T>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetFormData({ ...formData, [name]: value });
  };

  return { formData, handleChange };
};
