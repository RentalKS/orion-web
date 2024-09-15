import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "../lib/auth";
import { AppRoot } from "./routes/app/root";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react-refresh/only-export-components
export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: '/login',
            lazy: async () => {
                const { LoginForm } = await import('../features/auth/login-form');
                return { Component: LoginForm };
            },
        },
        {
            path: '/',
            element: (
                <AppRoot />
            ),
            children: [
                {
                    path: 'dashboard',
                    lazy: async () => {
                        const { Dashboard } = await import('../features/dashboard/dashboard');
                        return { Component: Dashboard };
                    },
                }
            ]
        },
        {
            path: '/app',
            element: (
                <ProtectedRoute>
                    <AppRoot />
                </ProtectedRoute>
            ),
            children: []
        }
    ]);

export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
};