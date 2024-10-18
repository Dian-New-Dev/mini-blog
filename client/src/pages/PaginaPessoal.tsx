import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import GerenciarPosts from './GerenciarPosts';

const PaginaPessoal: React.FC = () => {

    //estado para mostrar gerenciar
    const [mostrarGerenciar, setMostrarGerenciar] = useState<boolean>(false)
    function clicouGerenciar() {
        setMostrarGerenciar(prevValue => !prevValue) // toggle: true/false
    }

    const { id } = useParams();

    const loginCtxt = useContext(LoginContext)
    const navigate = useNavigate();

    //checar se o usuario de fato logou
    //se não logou, retorna para homepage
    useEffect(() => {
        if (loginCtxt?.isUserLoggedIn === false) {
            navigate('/')
        }
    }, [loginCtxt, navigate])

    //se nao logou, isso aqui garante que nada é renderizado
    //antes de direcionar para '/'
    if (loginCtxt?.isUserLoggedIn === false) {
        return null;
    }

    return (
        <div>
            <div>
                <h1>Olá, esta é sua página pessoal, {id}</h1>
                <p>Vamos postar sobre o que hoje?</p>
            </div>

            <div>
                <button className="
                        bg-blue-600
                        p-2
                        border
                        border-gray-700
                        hover:bg-blue-800
                        hover:scale-110
                        font-bold"
                        
                        >
                            <Link to={loginCtxt?.isUserLoggedIn ? `/novo-post` : '/login'}>
                                Novo Post
                            </Link>
                </button >

                <button className="
                        bg-blue-600
                        p-2
                        border
                        border-gray-700
                        hover:bg-blue-800
                        hover:scale-110
                        font-bold"
                        onClick={clicouGerenciar}
                        >
                            Gerenciar Posts
                </button>
            </div>

            <div>
                {mostrarGerenciar && <GerenciarPosts />}
            </div>
        </div>

    )

};

export default PaginaPessoal;
