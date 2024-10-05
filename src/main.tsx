
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"

import './index.css'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Root from './routes/root'
import ErrorPage from './pages/ErrorPage'



const router = createBrowserRouter([
    {
        //elemento root route, o resto renderiza dentro dele
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/sign-up",
                element: <Cadastro />
            }
        ]
    },
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router ={router} />
    </StrictMode>,
)
