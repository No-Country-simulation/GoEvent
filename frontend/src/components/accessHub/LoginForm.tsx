import { login } from "../../services";
import { LoginData } from "../../types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormState } from "../../hooks/useFormState";
import React, { Dispatch } from "react";
import { googleIcon } from "../../utils";
import { SetStateAction, useAtom } from "jotai";
import { userAtom } from "../../context/atoms";

type ChildComponentProps = {
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
};

const LoginForm: React.FC<ChildComponentProps> = ({ setOpenRegister }) => {
  const navigate = useNavigate();
  const { formData, handleChange } = useFormState<LoginData>({
    email: "",
    password: "",
  });

  let [_, setUser] = useAtom(userAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData, setUser);

    if (response.success) navigate("/home");
    else toast.error("Tu usuario o contraseña esta mal");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-8 mt-2 flex w-full max-w-[600px] flex-col px-8 text-center lg:px-0"
      >
        <button
          type={"button"}
          className="mb-6 flex w-full max-w-[600px] items-center justify-center space-x-1 rounded-lg bg-[#C2BAA6] py-2"
        >
          <img src={googleIcon} alt="" />
          <p>Iniciar con Google </p>
        </button>

        <p>O ingresa con tu email</p>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="inputStyle mb-1.5 mt-2"
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
        <button onClick={() => setOpenRegister(true)}>
          ¿No tienes cuenta? <span className="font-semibold">Registrate</span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
