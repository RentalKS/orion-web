import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import MainLayout from '../../../components/layout/main-layout';

export const AppRoot = () => {
    const location = useLocation();
    return (
        <Suspense
            fallback={
                <div className="flex size-full items-center justify-center">
                    {/* TODO: Add spinner/loading component */}
                </div>
            }
        >
            <ErrorBoundary
                key={location.pathname}
                fallback={<div>Something went wrong!</div>}
            >
                <MainLayout contentChildren={<Outlet />} />
            </ErrorBoundary>
        </Suspense>
    );
};