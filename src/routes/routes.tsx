import React from 'react';
import {RouteObject} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import PostThread from "../pages/PostThread";


const Home = React.lazy(() => import('../pages/Home'));
const Forums = React.lazy(() => import('../pages/Forums'));
const Threads = React.lazy(() => import('../pages/Threads'));
const ThreadDetails = React.lazy(() => import('../pages/ThreadDetails'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
// const NotFound = React.lazy(() => import('../components/NotFound'));


export type AppRoute = Omit<RouteObject, 'children'> & {
    requireAuth?: boolean;
    children?: AppRoute[];
}

const routes: AppRoute[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
                requireAuth: false
            },
            {
                path: 'forums',
                element: <Forums />,
                requireAuth: false
            },
            {
                path: 'threads',
                element: <Threads />,
                requireAuth: false,
            },
            {
                path: 'threads/:id',
                element: <ThreadDetails />,
                requireAuth: false,
            },
            {
                path: 'login',
                element: <Login />,
                requireAuth: false

            },
            {
                path: 'register',
                element: <Register />,
                requireAuth: false

            },
            {
                path: 'post-thread',
                element: <PostThread />,
                requireAuth: false
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
