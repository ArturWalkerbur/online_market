import React, {useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {CustomContext} from "./Context";

const PrivateRoute = () => {

    const {isAdmin} = useContext(CustomContext);


    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
