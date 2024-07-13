import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
