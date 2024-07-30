import { Dispatch } from "react";
import { userAndToken } from "../../types";
import { closeIcon, userIcon } from "../../utils";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { SetStateAction } from "jotai";

interface User {
  userData: userAndToken | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const UserInformation: React.FC<User> = ({ userData, closeModal }) => {
  let { fullname, email, subscription_type } = getUserDatils(userData);

  return (
    <div className="degradado relative h-full w-full lg:mx-20">
      <div className="flex justify-between px-20 py-5 text-2xl font-semibold">
        <h2>Configuracion</h2>
        <button onClick={() => closeModal(false)}>
          <img src={closeIcon} alt="closeIcon"></img>
        </button>
      </div>
      <div className="flex pt-10">
        <div className="mr-16 flex w-3/12 flex-col items-center space-y-3">
          <img
            src={userIcon}
            alt="user"
            className="w-30 rounded-full bg-[#F5ECD7] p-8"
          />
          <span className="font-semibold">Foto de perfil</span>
          <button className="rounded-xl bg-[#FF8789] px-10 py-2.5 font-semibold">
            Subir archivo
          </button>
        </div>
        <div className="space-y-5">
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">Nombre:</span>
            {fullname}
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">Mail:</span>
            {email}
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">Suscripción:</span>
            {subscription_type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
