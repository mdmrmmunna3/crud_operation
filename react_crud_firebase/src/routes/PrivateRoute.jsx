import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-ring loading-xl"></span>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login' replace={true} state={{ from: location }}></Navigate>
    );


};

export default PrivateRoute;