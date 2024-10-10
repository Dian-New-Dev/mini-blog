import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
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
                action="#">

                    <input className='p-2 w-full text-green-900' type="text" placeholder='Usuário' />
                    <input className='p-2 w-full text-green-900' type="password" placeholder='Senha' />

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
