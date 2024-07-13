import { useState } from "react";
import { register } from "../../services";
import { RegisterData } from "../../types";
const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterData>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent) => {
    // const { name, value } = e.target;
    console.log(e.target);
  };

  return (
    <div>
      <form action="" onInput={handleChange}>
        <input type="text" name="fullname" value={formData.fullname} />
        <input type="email" name="email" value={formData.email} />
        <input type="text" name="password" value={formData.password} />
      </form>
    </div>
  );
};

export default RegisterForm;
