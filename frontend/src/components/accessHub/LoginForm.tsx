import { useState } from "react";
import { login } from "../../services";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(loginData);
    console.log(response);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
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
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;
