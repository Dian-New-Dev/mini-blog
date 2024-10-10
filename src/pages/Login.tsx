import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {

    //acessar array de usuarios do localstorage na montagem
    useEffect(() => {
        const users = localStorage.getItem('usuarios');
        const listaDeUsuarios = users ? JSON.parse(users) : [];
        checarDados(listaDeUsuarios);
    }, []);

    function checarDados(listaDeUsuarios) {
        console.log(listaDeUsuarios)
    }

    //receber dados de login inputados pelo user
    const [userInput, setUserInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    
    function handleUserInput(e:React.ChangeEvent<HTMLInputElement>) {
        setUserInput(e.target.value)
    }

    function handlePasswordInput(e:React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`chegamos aqui com os dados: user =${userInput}, e password=${passwordInput}`)
    }
    
    
    

    


    //checar receber dados de login

    //checar se usuario existe no banco de dados

    //checar se senha inputada coincide com senha no storage

    //direcionar para página pessoal com params do usuario
    
    return (
        <div className="outlet-components">
            <div className='
            flex
            flex-col
            gap-4
            w-full
            items-center
            '>
                <h4 className='
                text-3xl font-bold
                '>
                    Login de Usuário
                </h4>
            
                <form className='
                bg-green-400
                w-1/2
                p-4
                flex
                flex-col
                items-center
                gap-4
                flex-grow' 
                onSubmit={handleSubmit}
                >
                    
                    <input className='
                    p-2
                    w-full
                    text-green-900
                    '
                    onChange={handleUserInput}
                    type="text"
                    placeholder='Usuário'/>

                    <input className='
                    p-2
                    w-full
                    text-green-900'
                    onChange={handlePasswordInput}
                    type="password"
                    placeholder='Senha' />

                    <div className='flex items-center w-full px-2'>
                        <div className='w-1/2 flex gap-2 items-center'>
                            <input type="checkbox" name="lembrar-senha" id="lembrar-senha" />
                            <p className='text-sm'>Lembrar</p>
                        </div>
                        <div className='w-1/2 text-right'>
                            <a className='text-sm' href="#">Esqueceu a senha?</a>
                        </div>


                    </div>

                    <button className='
                    bg-green-800
                    w-[200px]
                    py-2
                    font-bold
                    text-green-100
                    hover:bg-green-900'
                    type='submit'>
                        Entrar
                    </button>
                
                </form>

                <div className='
                bg-green-400
                w-1/2
                p-4
                flex
                flex-col
                items-center
                gap-4
                flex-grow
                '>
                    <p className='font-bold'>Não possui conta?</p>
                    <Link to={"/sign-up"}>
                        <button className='
                    bg-green-800
                    w-[200px]
                    py-2
                    font-bold
                    text-green-100
                    hover:bg-green-900
                    '>
                            Cadastre-se
                        </button>
                    </Link>
                </div>
            
            </div>
        </div>
       
    );
};

export default Login;
