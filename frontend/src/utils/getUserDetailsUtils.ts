import { userAndToken } from "../types";

const getUserDatils = (user: userAndToken | null) => {
  return {
    created_at: user?.user.created_at ?? "no disponible",
    credit: user?.user.credit ?? "no disponible",
    email: user?.user.email ?? "no disponible",
    fullname: user?.user.fullname ?? "no disponible",
    id: user?.user.id ?? "no disponible",
    is_active: user?.user.is_active ?? "no disponible",
    password: user?.user.password ?? "no disponible",
    phone: user?.user.phone ?? "no disponible",
    profile_image: user?.user.profile_image ?? "no disponible",
    subscription_type_id: user?.user.subscription_type_id ?? "no disponible",
    subscription_type: user?.user.subscription_type ?? "no disponible",
    updated_at: user?.user.updated_at ?? "no disponible",
  };
};

export default getUserDatils;
