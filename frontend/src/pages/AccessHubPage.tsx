import { Toaster } from "sonner";
import LoginForm from "../components/accessHub/LoginForm";
import RegisterForm from "../components/accessHub/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { closeIcon } from "../utils";

const AccessHubPage = () => {
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  let navigate = useNavigate();

  let closeForm = () => (openRegister ? setOpenRegister(false) : navigate("/"));

  return (
    <>
      <div className="w-full">
        <div className="degradado relative m-auto flex h-screen w-full flex-col items-center justify-center lg:w-10/12">
          <div className="absolute top-2 flex w-full items-center justify-between px-8">
            <p className="text-xl font-semibold lg:ml-8">
              {!openRegister ? "Iniciar Sesion" : "Crear usuario"}
            </p>
            <button onClick={closeForm}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          {!openRegister ? (
            <LoginForm setOpenRegister={setOpenRegister} />
          ) : (
            <RegisterForm closeRegister={setOpenRegister} />
          )}
        </div>
      </div>

      <Toaster richColors />
    </>
  );
};

export default AccessHubPage;
