import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

import { queryConfig } from '../lib/react-query';
import { ConfigProvider } from 'antd';

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
            <ConfigProvider
                theme={{
                    token: {
                        "colorPrimary": "#006aff",
                        "colorInfo": "#006aff",
                        "colorError": "#ff2727",
                        "colorSuccess": "#53c940",
                        "colorTextBase": "#191919",
                        "colorBgBase": "#f8f7f1",
                    }
                }}
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
            </ConfigProvider>
        </React.Suspense>
    );
};