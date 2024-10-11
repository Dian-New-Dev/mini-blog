
import React, {useEffect, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import ListaDePostagens from "../pages/ListaDePostagens";
import UltimoPost from "../pages/UltimoPost";

import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import MiniPerfil from "../pages/MiniPerfil";

const Root: React.FC = () => {

    const loginCtxt = useContext(LoginContext)

    useEffect(() => {
        console.log(`site on, está o usuario logado? ${loginCtxt?.isUserLoggedIn} `)
    }, [loginCtxt])

    //controlar atualizacao da lista de postagens
    const [reRenderizar, setReRenderizar] = useState<number>(0);
    useEffect(() => {
    }, [reRenderizar])

    //controlar renderização condicional de UltimoPost / Outlet
    const [clicouEmLinks, setClicouEmLinks] = useState<boolean>(false)
    function linkClicado() {
        setClicouEmLinks(true)
    }

    function clicouEmBleg() {
        setClicouEmLinks(false)

    }
    
    
    return (
        <div className="
        flex
        min-h-screen
        ">
            <div id="sidebar"
            className="
            w-[25%]
            min-w-[300px]
            p-8

            flex-grow
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
                onClick={clicouEmBleg}
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
                    <Link onClick={linkClicado} to="/login">Login</Link>
                    <Link onClick={linkClicado} to="/sign-up">Cadastre-se</Link>

                    <button className="
                    bg-blue-600
                    p-2
                    border
                    border-gray-700
                    hover:bg-blue-800
                    hover:scale-110
                    font-bold"
                    onClick={linkClicado}
                    >
                        <Link to={loginCtxt?.isUserLoggedIn ? `/novo-post` : '/login'}>
                            Novo Post
                        </Link>
                    </button>

                </div>

                <div id="perfil-container" className={`
                ${loginCtxt?.isUserLoggedIn ? 'block' : 'hidden'}
                `}
                >

                    <MiniPerfil />  
                </div>

                <nav className="">
                    <ul>
                        {<ListaDePostagens reRenderizar={reRenderizar} setClicouEmLinks={setClicouEmLinks} />}
                    </ul>
                </nav>
            </div>

            <div className="
            flex flex-col 
            w-full
            bg-green-300
            p-8
            gap-4
            relative
            
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
                
                <div id="outlet-footer-container" className="
                flex
                flex-col
                h-full
                justify-between
                gap-4

                
                

                ">
                    <div id="outlet" className="
                    flex
                    flex-col
                    flex-grow
                    
                    ">
                        {clicouEmLinks ?
                        <Outlet context={[reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks]} />
                        : <UltimoPost />}
                        
                        
                    </div>

                    <div id="footer" className="
                    
                    p-4
                    text-center
                    bg-green-950
                    border-4
                    border-double
                    border-green-200
                    text-green-200
                    ">
                        <p>DA Web Dev - 2024</p>

                    </div>
                </div>

            </div>
            


        </div>
    )
    
}

export default Root;

