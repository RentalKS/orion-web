import { configureAuth } from 'react-query-auth';
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '../types/api';
import { api } from './api-client';
import { z } from 'zod';
import { useEffect } from 'react';

const getUser = async (): Promise<AuthResponse> => {
    const response = (await api.get('/auth/me')) as { data: AuthResponse };

    return response.data;
};


const logout = (): Promise<void> => {
    return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
    email: z.string({ message: 'Please enter your email' }).email('Invalid email'),
    password: z.string({ message: 'Please enter your password' }).min(5, 'Password is too short'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
    return api.post('/auth/login', data);
};

export const registerInputSchema = z
    .object({
        email: z.string().min(1, 'Required'),
        firstName: z.string().min(1, 'Required'),
        lastName: z.string().min(1, 'Required'),
        password: z.string().min(1, 'Required'),
    })
    .and(
        z
            .object({
                teamId: z.string().min(1, 'Required'),
                teamName: z.null().default(null),
            })
            .or(
                z.object({
                    teamName: z.string().min(1, 'Required'),
                    teamId: z.null().default(null),
                }),
            ),
    );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
    data: RegisterInput,
): Promise<AuthResponse> => {
    return api.post('/auth/register', data);
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
            navigate('/login')
        }
    }, [user.data]);

    return children;
};