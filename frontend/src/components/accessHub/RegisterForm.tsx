import { useState } from "react";
import { register } from "../../services";
import { RegisterData } from "../../types";
const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterData>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="border"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border"
        />
        <button type="submit"> Crear Usuario </button>
      </form>
    </div>
  );
};

export default RegisterForm;
