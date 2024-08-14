import React, {Suspense} from "react";
import ErrorBoundary from "../components/common/ErrorBoundary";
import Loading from "../components/common/Loading";
import routes from "./routes";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


const AppRouter: React.FC = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading/>} >
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                route.requireAuth ? (
                                    <ProtectedRoute>
                                        {route.element}
                                    </ProtectedRoute>
                                ) : (route.element)
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}

export default AppRouter;