import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ProtectedRouteProps } from "../types";

const ProtecteRoute: React.FC<ProtectedRouteProps> = ({
  element,
  redirectTo,
}) => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  console.log(user);
  if (!user) navigate(redirectTo);
  else return element;
};

export default ProtecteRoute;
