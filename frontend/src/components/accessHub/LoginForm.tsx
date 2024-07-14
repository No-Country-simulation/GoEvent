import { login } from "../../services";
import { LoginData } from "../../types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormState } from "../../hooks/useFormState";
import React from "react";

type ChildComponentProps = {
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm: React.FC<ChildComponentProps> = ({ setOpenRegister }) => {
  const navigate = useNavigate();
  const { formData, handleChange } = useFormState<LoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData);

    if (response.success) navigate("/home");
    else toast.error("Tu usuario o contraseña esta mal");
  };

  return (
    <>
      <button className="mb-6 w-full max-w-[600px] rounded-lg bg-[#C2BAA6] py-2">
        Iniciar con Google
      </button>
      <p>O ingresa con tu email</p>
      <form
        onSubmit={handleSubmit}
        className="mb-8 mt-2 flex w-full max-w-[600px] flex-col px-8 lg:px-0"
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="inputStyle mb-1.5"
          placeholder="Gmail"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="inputStyle mb-4"
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#FF8789] py-2 font-semibold"
        >
          Ingresar
        </button>
      </form>
      <div className="space-y-3 text-center">
        <p>¿Olvidaste tu contraseña?</p>
        <p onClick={() => setOpenRegister(true)}>
          ¿No tienes cuenta? <span className="font-semibold">Registrate</span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
