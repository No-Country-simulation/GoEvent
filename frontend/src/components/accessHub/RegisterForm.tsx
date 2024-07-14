import { useFormState } from "../../hooks/useFormState";
import { register } from "../../services";
import { RegisterData } from "../../types";
import { toast } from "sonner";

const RegisterForm = () => {
  const { formData, handleChange } = useFormState<RegisterData>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await register(formData);

    response.success
      ? toast.success("Usuario creado correctamente")
      : toast.error("Hay un error");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[600px] flex-col px-8"
    >
      <label htmlFor="" className="mb-3">
        Ingresa tu nombre y apellido
      </label>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        className="inputStyle mb-3"
        placeholder="Nonmbre y apellido"
      />
      <label htmlFor="" className="mb-3">
        Ingresa tu email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="inputStyle mb-3"
        placeholder="Ejemplo@gmail.com"
      />
      <label htmlFor="" className="mb-3">
        Ingresa tu contraseña
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="inputStyle mb-10"
        placeholder="···············"
      />
      <button
        type="submit"
        className="rounded-lg bg-[#FF8789] py-2 font-semibold"
      >
        Registrate
      </button>
    </form>
  );
};

export default RegisterForm;
