import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

import { queryConfig } from '../lib/react-query';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            }),
    );

    return (
        <React.Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    {/* TODO: Add fallback */}
                </div>
            }
        >
            <QueryClientProvider client={queryClient}>
                {/* <AuthLoader
                    renderLoading={() => (
                        <div className="flex h-screen w-screen items-center justify-center">
                             TODO: Add loading component
                        </div>
                    )}
                > */}
                {children}
                {/* </AuthLoader> */}
            </QueryClientProvider>
        </React.Suspense>
    );
};