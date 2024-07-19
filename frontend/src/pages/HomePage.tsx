import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import UserInformation from "../components/home/UserInformation";
import UserMenu from "../components/home/UserMenu";

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
