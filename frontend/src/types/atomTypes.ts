interface userData {
  id: string;
  createdAt: string;
  description: string;
  email: string;
  img: string;
  name: string;
  phone: string;
  rating: number[];
  updatedAt: string;
}

export interface userAndToken {
  token: string;
  user: userData;
}
