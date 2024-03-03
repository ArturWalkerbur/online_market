import React, {useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {CustomContext} from "./Context";

const PrivateRoute = () => {

    const {getUserRole, isAuthenticated} = useContext(CustomContext);

    return getUserRole() == "ADMIN" ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
