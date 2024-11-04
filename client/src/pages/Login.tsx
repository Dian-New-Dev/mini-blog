import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { UserNameContext } from '../context/userNameContext';

const Login: React.FC = () => {

    console.log(import.meta.env.VITE_API_URL)

    //para levar o usuario a pagina pessoal se login OK
    const navigate = useNavigate();

    const [erroSenha, setErroSenha] = useState<boolean>(false); //se senha errada
    const [erroNome, setErroNome] = useState<boolean>(false); // se senha errada e nome não existe
    const [loginGreenlit, setLoginGreenLit] = useState<boolean>(false) // se nenhum erro, credenciais corretas = login

    //receber dados de login inputados pelo user
    const [userInput, setUserInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    
    function handleUserInput(e:React.ChangeEvent<HTMLInputElement>) {
        setUserInput(e.target.value)
    }

    function handlePasswordInput(e:React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)

    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        //resetar variaveis de erro
        setErroNome(false)
        setErroSenha(false)
        setLoginGreenLit(false)

        const dadosLogin = {
            usuario: userInput,
            senha1: passwordInput,
        }

        try {
            const response = await fetch(`https://infinita-tenebrae-backend.onrender.com/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            });

            if(response.ok) {
                //const result = await response.json();
                setLoginGreenLit(true)
            } else {
                console.error('Login não foi bem sucedido', response.statusText)
                setLoginGreenLit(false)
            }
        } catch (error) {
            console.error('erro ao enviar dados:', error)
        }        
    }

    // se deu tudo certo, direcionar usuario para pagina pessoal
    const loginCtxt = useContext(LoginContext)
    const userCtxt = useContext(UserNameContext)
    useEffect(() => {
        if (loginGreenlit) {
            loginCtxt?.setIsUserLoggedIn(true)
            navigate(`/my-page/${userInput}`);
            userCtxt?.setUserNameCtx(userInput)
        }
    },[loginGreenlit, navigate] );  

    return (
        <div className="outlet-components plano-de-fundo-tela">
            <div className='
            flex
            flex-col
            gap-4
            w-full
            items-center
            '>
                <h3 className='
                text-3xl font-bold
                '>
                    Login de Usuário
                </h3>
            
                <form className='
                bg-green-500
                w-1/2
                p-4
                flex
                flex-col
                items-center
                gap-4
                flex-grow
                rounded-lg' 
                onSubmit={handleSubmit}
                >

                    <p className={`
                    text-sm
                    text-red-500
                    text-center
                    leading-3
                    ${erroSenha && !erroNome ? 'block' : 'hidden'}
                    `}>
                        Nome de usuário e senha não coincidem.</p>
                    
                    <p className={`
                    text-sm
                    text-red-500
                    text-center
                    leading-3
                    ${erroNome ? 'block' : 'hidden'}
                    `}>
                        Nome de usuário não existe.</p>

                    <input className={`
                    p-2
                    w-full
                    text-green-900
                    ${erroNome && !erroSenha ? 'borda-de-erro' : 'border-0'}
                    
                    `}
                    onChange={handleUserInput}
                    type="text"
                    placeholder='Usuário'/>

                    <input className={`
                    p-2
                    w-full
                    text-green-900
                    ${erroSenha ? 'borda-de-erro' : 'border-0'}
                    
                    `}
                    onChange={handlePasswordInput}
                    type="password"
                    placeholder='Senha' />

                    <div className='flex items-center w-full px-2'>
                        <div className='w-1/2 flex gap-2 items-center'>
                            <input type="checkbox" name="lembrar-senha" id="lembrar-senha" />
                            <p className='text-sm'>Lembrar</p>
                        </div>

                        <div className='w-1/2 text-right'>
                            <a className='text-sm' href="#">
                                <p>
                                    Esqueceu a senha?
                                </p>
                                   
                            </a>
                        </div>
                    </div>

                    <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold' type='submit'>
                        <p>
                            Entrar
                        </p> 
                    </button>
                
                </form>

                <div className='
                bg-green-500
                w-1/2
                p-4
                flex
                flex-col
                items-center
                gap-4
                flex-grow
                rounded-lg
                '>
                    <p className='font-bold'>Não possui conta?</p>
                    <Link to={"/sign-up"}>
                        <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold'>
                            <p>
                                Cadastre-se
                            </p>
                        </button>
                    </Link>
                </div>
            
            </div>
        </div>
       
    );
};

export default Login;