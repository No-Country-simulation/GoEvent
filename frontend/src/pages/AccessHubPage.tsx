import { Toaster } from "sonner";
import LoginForm from "../components/accessHub/LoginForm";
import RegisterForm from "../components/accessHub/RegisterForm";
import { useState } from "react";

const AccessHubPage = () => {
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  return (
    <>
      <div className="w-full">
        <div className="degradado relative m-auto flex h-screen w-full flex-col items-center justify-center lg:w-10/12">
          <div className="absolute top-2 flex w-full items-center justify-between px-10">
            <p className="text-xl font-semibold">
              {!openRegister ? "Iniciar Sesion" : "Crear usuario"}
            </p>
            <button className="text-3xl">x</button>
          </div>
          {!openRegister ? (
            <LoginForm setOpenRegister={setOpenRegister} />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>

      <Toaster richColors />
    </>
  );
};

export default AccessHubPage;
