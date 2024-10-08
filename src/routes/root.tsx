
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Root: React.FC = () => {
    return (
        <div className="flex">
            <div id="sidebar"
            className="
            w-2/12
            min-w-[200px]
            p-8
            h-screen
            bg-green-950
            text-green-200
            flex
            flex-col
            gap-4
            border-r-4
            border-double
            border-green-200
            "
            >
                <Link to={`/`}
                className="
                text-3xl
                text-blue-500
                font-bold
                
                ">Mini BlEg</Link>

                <div 
                id='painel-usuario'
                className="
                flex
                flex-col
                gap-2
                border
                border-green-200
                p-4
                bg-green-900
                items-start
                "
                >
                    <Link to="/login">Login</Link>
                    <Link to="/sign-up">Cadastre-se</Link>

                    <button className="
                    bg-blue-600
                    p-2
                    border
                    border-gray-700
                    hover:bg-blue-800
                    hover:scale-110
                    font-bold">
                        <Link to="/novo-post">Novo Post</Link>
                    </button>

                </div>

                

                    <nav>
                        <ul>
                            //aqui vão as postagens
                        </ul>
                    </nav>
            </div>

            <div className="flex flex-col 
                w-full
                bg-green-300
                p-8
                gap-4
                ">
                <div id="header">
                    <div className="
                    flex
                    flex-col
                    gap-4
                    p-4
                    bg-green-950
                    border-4
                    border-double
                    border-green-200
                    
                    
                    ">
                        <h2 className="
                        text-4xl
                        font-bold
                        text-green-200
                        ">Um blog, infinitas ideias</h2>
                        
                        <h3 className="
                        text-xl
                        italic
                        text-green-200
                        ">Os ecos de uma mente soam tão
                            absurdos e surreais quanto os
                            gritos de um deus cósmico contemplando
                            o vazio de sua existência.

                        </h3>
                    </div>

                </div>
                
                <div id="outlet">
                    <Outlet />
                </div>

            </div>
            


        </div>
    )
    
}

export default Root;

