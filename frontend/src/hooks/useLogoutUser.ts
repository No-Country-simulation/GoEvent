import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { closeSesion } from "../utils";

const useLogoutUser = () => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  return (status: number) => {
    if (status === 401) {
      closeSesion(navigate, setUser);
      toast.error("Sesión expirada. Inicia sesión nuevamente.");
    }
  };
};

export default useLogoutUser;
