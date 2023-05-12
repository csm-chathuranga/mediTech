import React from 'react';
import { Outlet } from 'react-router-dom';

import LoginV3 from '../pages/user/login-v3.js';
import Logout from '../pages/user/logout';
import UserAuth from '../pages/user/userAuth.jsx';
import Register from './../pages/user/register.jsx';
import Success from './../pages/confirmation/success.jsx';
import Edit from './../pages/user/edit.jsx';

const AppRoute = [
    {
        path: '/*', 
        element: <Outlet />,
        children: [
            { path: '', element:<LoginV3 /> },
            { path: 'logout', element:<Logout /> },
        ]
    }, 
    {
        path: '/user/*', 
        element: <Outlet />,
        children: [
            { path: 'show', element:<UserAuth /> },
            { path: 'register', element:<Register /> },
            { path: 'edit', element:<Edit /> },
            { path: 'success/:location', element:< Success/> }
        ]
    },
];


export default AppRoute;