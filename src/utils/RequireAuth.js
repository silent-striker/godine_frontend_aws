import React, { useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
    const { clearAuthData, isSessionValid } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!isSessionValid()) {
            clearAuthData();
        }
    }, []);

    return isSessionValid() ? <Outlet />
        : <Navigate to="/signin" state={{ from: location }} replace />
}

export default RequireAuth;