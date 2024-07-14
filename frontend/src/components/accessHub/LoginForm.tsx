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
    <div className="w-full">
      <div className="degradado relative m-auto flex h-screen w-full flex-col items-center justify-center lg:w-10/12">
        <div className="absolute top-2 flex w-full items-center justify-between px-10">
          <p className="text-xl font-semibold">Iniciar Sesion</p>
          <button className="text-3xl">x</button>
        </div>
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
            className="mb-1.5 rounded-lg border border-[#C2BAA6] bg-[#EBE2CD] px-6 py-2 outline-none"
            placeholder="Gmail"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 rounded-lg border border-[#C2BAA6] bg-[#EBE2CD] p-2 px-6 outline-none"
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
          <p>
            ¿No tienes cuenta? <span className="font-semibold">Registrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
