import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";

const useUserState = () => {
    const [user, setUser] = useAtom(userAtom);
    return { user, setUser }
}

export default useUserState