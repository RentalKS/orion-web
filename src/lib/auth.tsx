import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';

import apiClient from './api-client';

const logout = (): Promise<void> => {
    return apiClient.post('/auth/logout');
};

const authConfig = {
    userFn: () => { },
    loginFn: async () => { },
    registerFn: async () => { },
    logoutFn: logout,
};

// eslint-disable-next-line react-refresh/only-export-components
export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
    configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useUser();
    const location = useLocation();

    if (!user.data) {
        return (
            <Navigate
                to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    return children;
};