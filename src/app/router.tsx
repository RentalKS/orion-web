import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "../lib/auth";
import { AppRoot } from "./routes/app/root";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react-refresh/only-export-components
export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: '',
            lazy: async () => {
                const { AppRoot } = await import('./routes/app/root');
                return { Component: AppRoot };
            },
        },
        {
            path: '',
            lazy: async () => {
                const { default: LoginForm } = await import('../features/auth/login-form');
                return { Component: LoginForm };
            },
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