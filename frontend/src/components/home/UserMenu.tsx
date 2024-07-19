import { useAtom } from "jotai";
import {
  calendarIcon,
  clockIcon,
  contactsIcon,
  magneticCardIcon,
  membershipCardIcon,
  settingsIcon,
} from "../../utils";
import { userAtom } from "../../context/atoms";
import UserInformation from "./UserInformation";
import getUserDatils from "../../utils/getUserDetailsUtils";
import { useState } from "react";

const UserMenu = () => {
  let [user] = useAtom(userAtom);
  let [isMenuUserOpen, setIsMenuUserOpen] = useState(false);

  let { fullname, subscription_type } = getUserDatils(user);

  let isPay = subscription_type !== "free";

  const sections = [
    { icon: calendarIcon, text: "Mis Eventos", id: "events" },
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
      onClick: () => setIsMenuUserOpen(true),
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
    <div className="flex">
      <div className="degradado flex h-screen w-full flex-col lg:mx-20">
        <div className="mx-10 flex justify-between pb-16 pt-5 text-2xl font-semibold">
          <p>¡Hola {fullname}!</p> <span>x</span>
        </div>
        <ul className="flex-grow space-y-6 px-10">
          {sections.map(
            ({
              icon,
              text,
              id,
              extra = null,
              mostrar = true,
              onClick = () => {},
            }) =>
              mostrar && (
                <li
                  key={id}
                  className="flex cursor-pointer items-center space-x-7"
                  onClick={onClick}
                >
                  <img src={icon} alt={id} />
                  <div className="flex flex-col">
                    <span>{text}</span>
                    {extra && <span>{extra}</span>}
                  </div>
                </li>
              ),
          )}
        </ul>
        <div className="m-20">
          <button className="">Cerrar sesion</button>
        </div>
      </div>
      {isMenuUserOpen && (
        <UserInformation userData={user} closeModal={setIsMenuUserOpen} />
      )}
    </div>
  );
};

export default UserMenu;
