import { useAtom } from "jotai";
import UserMenu from "../components/home/UserMenu";
import { userAtom } from "../context/atoms";
import EventManagement from "../components/events/EventManagement";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div>
      <EventManagement />
    </div>
  );
};

export default HomePage;
