import { Toaster } from "sonner";
import LoginForm from "../components/accessHub/LoginForm";
import RegisterForm from "../components/accessHub/RegisterForm";

const AccessHubPage = () => {
  return (
    <>
      <LoginForm />
      {/* <RegisterForm /> */}
      <Toaster richColors />
    </>
  );
};

export default AccessHubPage;
