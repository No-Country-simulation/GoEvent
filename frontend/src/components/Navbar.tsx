import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { useNavigate } from "react-router-dom";
import UserMenu from "./home/UserMenu";
import { Dispatch, useState } from "react";
import { SetStateAction } from "jotai/vanilla";

interface NavBarProps {
  openMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavBarProps> = ({ openMenu }) => {
  const [user] = useAtom(userAtom);

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) openMenu(true);
    else navigate("/login");
  };

  return (
    <div className="w-full">
      <div className="naranja flex h-[60px] w-full items-center px-10 shadow-md shadow-gray-500">
        {user && (
          <img
            src="/Menu.png"
            className="curs h-[25px] w-[25px]"
            alt="menu"
            onClick={handleClick}
          />
        )}
        <div className="flex w-full justify-center">
          <img
            src="/Union.svg"
            className="ml-7 h-[200px] w-[150px]"
            alt="logo"
          />
        </div>
        {!user && (
          <p
            onClick={() => navigate("/login")}
            className="rounded-full border-2 border-white px-10 text-sm font-bold text-white"
          >
            Iniciar sesión
          </p>
        )}
      </div>
      {/* <UserMenu closeMenu={setOpenMenu} />   */}
    </div>
  );
};

export default Navbar;
