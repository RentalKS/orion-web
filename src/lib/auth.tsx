import { configureAuth } from "react-query-auth";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/api";
import { api } from "./api-client";
import { z } from "zod";
import { useEffect } from "react";

const getUser = async (): Promise<AuthResponse> => {
  const response = (await api.get("/api/users/me")) as { data: AuthResponse };

  return response.data;
};

const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.clear();
    resolve();
  });
};

export const loginInputSchema = z.object({
  email: z
    .string({ message: "Please enter your email" })
    .email("Invalid email"),
  password: z
    .string({ message: "Please enter your password" })
    .min(4, "Password is too short"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
export const loginWithEmailAndPassword = async (
  data: LoginInput
): Promise<AuthResponse> => {
  try {
    const response: any = await api.post("/api/v1/auth/authenticate", data);
    const { access_token, refresh_token } = response;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, "Required"),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, "Required"),
          teamId: z.null().default(null),
        })
      )
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return api.post("/auth/register", data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response;
  },
  logoutFn: logout,
};

// eslint-disable-next-line react-refresh/only-export-components
export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data) {
      navigate("/login");
    }
  }, [user.data]);

  if (!localStorage.getItem("access_token")) {
    return <></>;
  }

  return children;
};
