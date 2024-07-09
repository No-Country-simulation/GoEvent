import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { login } from "../services";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);

  console.log(user);

  const loginUser = async () => {
    const response = await login({
      email: "jose23122009@gmail.com",
      password: "123456789",
    });
    if (!response.success) alert("no se pudo loguar");
  };
  return (
    <div>
      <h1>Hola mundo desde Home!!</h1>
      <button onClick={loginUser}>Login</button>
      <p>{user === null ? "no estas logueado" : user.user.email}</p>
    </div>
  );
};

export default HomePage;
