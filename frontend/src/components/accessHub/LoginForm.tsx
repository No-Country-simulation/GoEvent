import { login } from "../../services";
import { LoginData } from "../../types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormState } from "../../hooks/useFormState";

const LoginForm = () => {
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
    <div className="w-full ">
      <div className="relative degradado w-full lg:w-10/12 m-auto h-screen flex flex-col justify-center items-center ">
        <div className="flex w-full items-center justify-between px-10 absolute top-2">
          <p className="text-xl font-semibold">Iniciar Sesion</p>
          <button className="text-3xl">x</button>
        </div>
        <button className="bg-[#C2BAA6] py-2 w-full max-w-[600px] rounded-lg mb-6">
          Iniciar con Google
        </button>
        <p>O ingresa con tu email</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[600px] mb-8 mt-2 px-8 lg:px-0 "
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#EBE2CD] border border-[#C2BAA6] rounded-lg mb-1.5 py-2 px-6 outline-none"
            placeholder="Gmail"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#EBE2CD] border border-[#C2BAA6] rounded-lg mb-4 p-2 px-6 outline-none"
            placeholder="Contraseña"
          />
          <button
            type="submit"
            className="bg-[#FF8789] rounded-lg py-2 font-semibold "
          >
            Ingresar
          </button>
        </form>
        <div className="text-center space-y-3">
          <p>¿Olvidaste tu contraseña?</p>
          <p>
            ¿No tienes cuenta? <span className="font-semibold">Registrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
