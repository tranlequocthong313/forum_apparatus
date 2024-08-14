import React from 'react';
import {RouteObject} from "react-router-dom";


const Home = React.lazy(() => import('../pages/Home'));
const Forums = React.lazy(() => import('../pages/Forums'));
const Threads = React.lazy(() => import('../pages/Threads'));
const ThreadDetails = React.lazy(() => import('../pages/ThreadDetails'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
// const NotFound = React.lazy(() => import('../components/NotFound'));


export type AppRoute = RouteObject & {
    requireAuth?: boolean;
    children?: AppRoute[];
}

const routes: AppRoute[] = [
    { path: '/', element: </>, requireAuth: false },
    { path: '/forums', element: <Forums/>, requireAuth: true },
    { path: '/threads', element: <Threads/>, requireAuth: true },
    { path: '/threads/:id', element: <ThreadDetails/>, requireAuth: true },
    { path: '/login', element: <Login/>, requireAuth: false },
    { path: '/register', element: <Register/>, requireAuth: false },
    { path: '*', element: <NotFound/>, requireAuth: false },
]
