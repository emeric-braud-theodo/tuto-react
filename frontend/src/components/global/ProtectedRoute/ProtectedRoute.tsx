import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <div>Chargement...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;