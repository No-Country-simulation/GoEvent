import { useAtom } from "jotai";
import {
  calendarIcon,
  clockIcon,
  closeIcon,
  closeSesion,
  contactsIcon,
  magneticCardIcon,
  membershipCardIcon,
  settingsIcon,
} from "../../utils";
import { userAtom } from "../../context/atoms";
import UserInformation from "./UserInformation";
import getUserDatils from "../../utils/getUserDetailsUtils";
import React, { Dispatch, useState } from "react";
import { SetStateAction } from "jotai/vanilla";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  closeMenu: Dispatch<SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
  let [user, setUser] = useAtom(userAtom);
  let [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  let navigate = useNavigate();

  let { fullname, subscription_type } = getUserDatils(user);

  let isPay = subscription_type !== "free";

  const sections = [
    {
      icon: calendarIcon,
      text: "Mis Eventos",
      id: "events",
      onClick: () => navigate("/home"),
    },
    {
      icon: membershipCardIcon,
      text: "Tipo de suscripción",
      id: "subscription",
      extra: subscription_type,
    },
    {
      icon: settingsIcon,
      text: "Configuración de la cuenta",
      id: "account-settings",
      onClick: () => setIsUserMenuOpen(true),
    },
    { icon: clockIcon, text: "Historial de eventos", id: "event-history" },
    {
      icon: magneticCardIcon,
      text: "Medio de pago",
      id: "payment-method",
      mostrar: isPay,
    },
    {
      icon: contactsIcon,
      text: "Directorio de contactos",
      id: "contacts-directory",
      mostrar: isPay,
    },
  ];

  return (
    <div className="absolute flex min-h-[calc(100vh-60px)] w-full">
      {!isUserMenuOpen ? (
        <div className="degradado flex min-h-full w-full md:w-9/12 flex-col mx-auto">
          <div className="mx-10 flex justify-between pb-8 pt-5 text-2xl font-semibold">
            <p>¡Hola {fullname}!</p>{" "}
            <button onClick={() => closeMenu(false)} className="p-1 rounded-full transition duration-300 ease-in-out hover:scale-[1.15]">
              <img src={closeIcon} alt="closeIcon" />
            </button>
          </div>

          <ul className="flex-grow space-y-2">
            {sections.map(
              ({
                icon,
                text,
                id,
                extra = null,
                mostrar = true,
                onClick = () => { },
              }) =>
                mostrar && (
                  <li
                    key={id}
                    className="flex cursor-pointer items-center space-x-7 pl-10 pr-4 py-4 transition ease duration-200 hover:bg-orange-400/50 hover:font-semibold"
                    onClick={onClick}
                  >
                    <img src={icon} alt={id} />
                    <div className="flex flex-col capitalize">
                      <span>{text}</span>
                      {extra && <span>{extra}</span>}
                    </div>
                  </li>
                ),
            )}
          </ul>
          <div className="m-16 text-end">
            <button className="transition ease duration-200 px-6 py-2 rounded-2xl text-white font-semibold bg-red-500 hover:bg-red-600" onClick={() => closeSesion(navigate, setUser)}>
              Cerrar sesion
            </button>
          </div>
        </div>
      ) : (
        <UserInformation userData={user} closeModal={setIsUserMenuOpen} />
      )}
    </div>
  );
};

export default UserMenu;
