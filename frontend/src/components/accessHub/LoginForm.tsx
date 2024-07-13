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
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-green-400 w-[400px] p-10"
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;
