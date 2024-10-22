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
        <div className='p-8 plano-de-fundo-tela flex flex-col gap-8'>
            <div className='flex flex-col gap-8'>
                <h3 className='text-xl '>
                    Olá, esta é sua página pessoal, {id}.
                </h3>
                <p>
                    Vamos postar sobre o que hoje?
                </p>
            </div>

            <div className='flex gap-4'>
                <button className="bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold">
                    <Link to={loginCtxt?.isUserLoggedIn ? `/novo-post` : '/login'}>
                        <p>
                            Novo Post
                        </p>
                    </Link>
                </button >

                <button onClick={clicouGerenciar} className="bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold">
                    <p>
                        Gerenciar Posts
                    </p>
                </button>
            </div>

            <div>
                {mostrarGerenciar && <GerenciarPosts />}
            </div>
        </div>

    )

};

export default PaginaPessoal;
