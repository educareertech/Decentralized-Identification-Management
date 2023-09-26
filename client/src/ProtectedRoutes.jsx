import { Outlet } from 'react-router-dom';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const userDid = sessionStorage.getItem('userDid');
    if(userDid){
        return <Outlet />
    }else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes;