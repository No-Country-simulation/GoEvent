import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import UserInformation from "../components/home/UserInformation";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {user && <UserInformation userData={user} />}
    </div>
  );
};

export default HomePage;
