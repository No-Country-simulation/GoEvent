import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { login } from "../services";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);

  // const loginUser = async () => {
  //   const response = await login({
  //     email: "jose23122009@gmail.com",
  //     password: "123456789",
  //   });
  //   if (!response.success) alert("no se pudo loguar");
  // };
  return (
    <div>
      {/* <h1>Hola mundo desde Home!!</h1>
      {/* <button onClick={loginUser}>Login</button> */}
      {/* <p>{user === null ? "no estas logueado" : user.user.email}</p> */}
      <div className="     lg:flex">
        <div className="h-[200px] w-[200px] bg-black"></div>
        <div className="h-[200px] w-[200px] bg-red-700"></div>
        <div className="h-[200px] w-[200px] bg-blue-600"></div>
        <div className="h-[200px] w-[200px] bg-green-600"></div>
      </div>
    </div>
  );
};

export default HomePage;
