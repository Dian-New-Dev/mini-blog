
import React from "react";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
    return (
        <div className="flex">
            <div
            id="sidebar"
            className="
            w-2/12
            p-8
            h-screen
            bg-green-950
            text-gray-200
            flex
            flex-col
            gap-4
            "
            >
                <h1
                className="
                text-3xl
                text-blue-500
                font-bold
                
                ">Mini BlEg</h1>

                <div 
                id='painel-usuario'
                className="
                flex
                flex-col
                gap-2
                border
                p-4
                bg-green-900
                "
                >
                    <a href="/login">Login</a>
                    <a href="/sign-up">Cadastre-se</a>

                </div>

                    <nav>
                        <ul>
                            //aqui vão as postagens
                        </ul>
                    </nav>
            </div>

            <div id="detail">
                <Outlet />
            </div>

        </div>
    )
    
}

export default Root;