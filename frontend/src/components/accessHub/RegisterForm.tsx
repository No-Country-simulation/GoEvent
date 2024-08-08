import { Dispatch } from "react";
import { useFormState } from "../../hooks/useFormState";
import { register } from "../../services";
import { RegisterData } from "../../types";
import { toast } from "sonner";
import { SetStateAction } from "jotai";

interface RegisterFormProps {
  closeRegister: Dispatch<SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeRegister }) => {
  const { formData, handleChange } = useFormState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { email, password, firstName, lastName } = formData;
    let response = await register({
      fullname: `${firstName} ${lastName}`,
      email,
      password,
    });

    response.success
      ? toast.success("Usuario creado correctamente")
      : toast.error("Hay un error");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[800px] flex-col px-8 lg:px-16"
      >
        <label htmlFor="" className="mb-3">
          Ingresa tu nombre
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="inputStyle mb-3"
          placeholder="Nonmbre "
          required
        />
        <label htmlFor="" className="mb-3">
          Ingresa tu apellido
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="inputStyle mb-3"
          placeholder="Apellido"
          required
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
          required
        />
        <div className="mb-10 flex flex-col">
          <label htmlFor="" className="mb-3">
            Ingresa tu contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="inputStyle"
            placeholder="···············"
            required
          />
          <p className="text-sm text-[#777878]">
            Incluye mínimo 8 carácteres, una mayúscula, una minúscula y un signo
            “!”{" "}
          </p>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[#FF8789] py-2 font-semibold"
        >
          Registrate
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
