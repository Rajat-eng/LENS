export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "User";
}

export interface ILoginRequest {
  email: string;
  password: string;
}
