import { useAtom } from "jotai";
import UserMenu from "../components/home/UserMenu";
import { userAtom } from "../context/atoms";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <UserMenu />
    </div>
  );
};

export default HomePage;
