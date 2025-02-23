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
                const { LoginContainer } = await import('../features/auth/login-container');
                return { Component: LoginContainer };
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
                        const { Reservations } = await import('../features/reservations');
                        return { Component: Reservations };
                    },
                },
                {
                    path: 'clients',
                    lazy: async () => {
                        const { Clients } = await import('../features/clients');
                        return { Component: Clients };
                    },
                },
                {
                    path: 'locations',
                    lazy: async () => {
                        const { Locations } = await import('../features/locations');
                        return { Component: Locations };
                    },
                },
                {
                    path: 'brands',
                    lazy: async () => {
                        const { Brands } = await import('../features/brands');
                        return { Component: Brands };
                    },
                },
                {
                    path: 'models',
                    lazy: async () => {
                        const { Models } = await import('../features/modelsOfBrand');
                        return { Component: Models };
                    },
                },
                {
                    path: 'rateDates',
                    lazy: async () => {
                        const { RateDates } = await import('../features/rateDates');
                        return { Component: RateDates };
                    },
                },
                {
                    path: 'companies',
                    lazy: async () => {
                        const { Companies } = await import('../features/companies');
                        return { Component: Companies };
                    },
                },
                {
                    path: 'categories',
                    lazy: async () => {
                        const { Categories } = await import('../features/categories');
                        return { Component: Categories };
                    },
                },
                {
                    path: 'sections',
                    lazy: async () => {
                        const { Sections } = await import('../features/sections');
                        return { Component: Sections };
                    },
                },
                {
                    path: 'sign',
                    lazy: async () => {
                        const { SignAgreement } = await import('../features/payments');
                        return { Component: SignAgreement };
                    },
                },
                {
                    path: 'daily-plan',
                    lazy: async () => {
                        const { DailyPlan } = await import('../features/planner');
                        return { Component: DailyPlan };
                    },
                },
                {
                    path: 'timeline',
                    lazy: async () => {
                        const { Baseline } = await import('../features/planner');
                        return { Component: Baseline };
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