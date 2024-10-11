import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface usuarios {
    correio: string;
    usuario: string;
    senha1: string;
    senha2: string;
    length: number;
}

const Login: React.FC = () => {

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

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        acessarDadosdoLocalStorage();

        //resetar variaveis
        setErroNome(false)
        setErroSenha(false)
        setLoginGreenLit(false)
        
    }

    //acessar dados do LocalStorage
    const [listaDeUsuarios, setListaDeUsuarios] = useState<usuarios[]>([])
    function acessarDadosdoLocalStorage() {
        const users = localStorage.getItem('usuarios');
        const lista = users ? JSON.parse(users) : [];
        setListaDeUsuarios(lista); // Isso atualiza de forma assíncrona
    }
    
    //quando listaDeUsuarios recebe os dados do localStorage,
    // esse ufeEffect aciona e dá seguimento ao fluxo
    useEffect(() => {
        validarLogin();
    }, [listaDeUsuarios]);

    //com dados do localstorage e do form compilados
    // tentar validar login


    function validarLogin() {
        if (listaDeUsuarios) {
            for (let i = 0; i < listaDeUsuarios.length; i++) {

                if (listaDeUsuarios[i].usuario === userInput) {
                    if (listaDeUsuarios[i].senha1 === passwordInput) {
                        console.log('encontramos um usuario com esse  nome e o password parece correto')
                        setLoginGreenLit(true)
                        break;
                    } else {
                        console.log('há um user mas senha incorreta')
                        setErroSenha(true)
                        return
                    }

                } else {
                    console.log('não achou nome')
                    setErroNome(true)
                }
            }
        }
        
    }

    useEffect(() => {
        if (loginGreenlit) {
            //direcionar usuario para pagina pessoal
        }
    },[loginGreenlit] )
    
    
    
    //checar se dados existem
    // function checarSeDadosExistem() {
    //     console.log(`lista de usuarios do local storage: ${listaDeUsuarios}`)
    //     console.log(`usuario: ${userInput} e senha: ${passwordInput}`)
    // }    
    

    


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
                    type='submit'
                    >
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

    // //acessar array de usuarios do localstorage na montagem
    // const [listaDeUsuarios, setListaDeUsuarios] = useState<usuarios>('')
    // useEffect(() => {
    //     const users = localStorage.getItem('usuarios');
    //     const lista = users ? JSON.parse(users) : [];
    //     setListaDeUsuarios(lista)
    //     console.log(listaDeUsuarios)
    // }, [userInput]);