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
                        const { Dashboard } = await import('../features/dashboard');
                        return { Component: Dashboard };
                    },
                },
                {
                    path: 'vehicles',
                    lazy: async () => {
                        const { Vehicles } = await import('../features/vehicles');
                        return { Component: Vehicles };
                    },
                },
                {
                    path: 'rentals',
                    lazy: async () => {
                        const { Rentals } = await import('../features/rentals');
                        return { Component: Rentals };
                    },
                },
                {
                    path: 'clients',
                    lazy: async () => {
                        const { Clients } = await import('../features/clients');
                        return { Component: Clients };
                    },
                },
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
        },
        {
            path: '*',
            lazy: async () => {
                const { NotFoundRoute } = await import('./routes/not-found');
                return { Component: NotFoundRoute };
            },
        },
    ]);

export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
};