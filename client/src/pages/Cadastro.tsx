import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Registrar: React.FC = () => {

    //carregar lista de usuarios cadastrados
    
    //receber valores dos inputs via onChange
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    function handleInputEmail(e:React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function handleInputUserName(e:React.ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value)
    }

    function handleInputSenha1(e:React.ChangeEvent<HTMLInputElement>) {
        setPassword1(e.target.value)
    }

    function handleInputSenha2(e:React.ChangeEvent<HTMLInputElement>) {
        setPassword2(e.target.value)
    }

    //enviar esses valores para localStorage via onSubmit

    const handleSubmit = async (e: React.FormEvent) => {
        //impede recarregar pagina
        e.preventDefault();

        //compila os dados em um objeto
        console.log(email , userName , password1 , password2);
        const preCadastro = {
            correio: email,
            usuario: userName,
            senha1: password1,
            senha2: password2,
        }

        //manda o objeto com os dados para o mongoDB
        try {
            const response = await fetch("https://infinita-tenebrae-backend.onrender.com/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(preCadastro),
            });
            
            if(response.ok) {
                const result = await response.json();
                console.log('Usuario cadastrado com sucesso:', result)
                desmontarComponente();
            } else {
                console.error('Deu ruim no cadastro', response.statusText)
            }

        } catch (error) {
            console.error('erro ao enviar dados:', error)
        }

        //verificar se dados são validos
        //verificarDados(preCadastro)
    };

    
    //verificao de e-mail e senha
    const [erroEmail] = useState<boolean>(false);
    const [erroSenha] = useState<boolean>(false);
    // function verificarDados(preCadastro) {
    //     // Inicializa as variáveis de erro locais
    //     let localErroEmail = false;
    //     let localErroSenha = false;
    
    //     // Verificar se o email tem @
    //     if (!preCadastro.correio.includes('@')) {
    //         console.log('email não tem arroba');
    //         localErroEmail = true;
    //         setErroEmail(true);  // Atualiza o estado visual
    //     } else {
    //         setErroEmail(false);  // Reseta o estado visual se o email for válido
    //     }
    
    //     // Verificar se as senhas são iguais
    //     if (preCadastro.senha1 !== preCadastro.senha2) {
    //         console.log('senhas são diferentes');
    //         localErroSenha = true;
    //         setErroSenha(true);  // Atualiza o estado visual
    //     } else {
    //         setErroSenha(false);  // Reseta o estado visual se as senhas forem iguais
    //     }

    //     //futura verificação: nome de usuario ou email
    //     //ja cadastrados?
    
    //     // Verifica se houve algum erro localmente
    //     if (localErroEmail || localErroSenha) {
    //         console.log('ao menos uma das condições falhou');
    //         // Os erros já foram renderizados para o usuário corrigir
    //     } else {
    //         // Dados válidos, armazena no localStorage
    //         armazenarDados(preCadastro);
    //     }
    // }

    // function armazenarDados(preCadastro) {
    //     console.log('chegou aqui, hora de armazenr os dados')

    //     //converter dados em um item de array para o primeiro user
    //     const arrayDeUsers = [
    //         preCadastro
    //     ]

    //     //ou adicionar na lista de usuarios para users posteriores
        
    //     //salvar dados no localStorage
    //     localStorage.setItem("usuarios", JSON.stringify(arrayDeUsers))
    //     desmontarComponente()
        
    //     //passar para componente de transição

    // }

    // se o cadastro foi bem sucedido, desmontar
    // e direcionar usuario à pagina de login-pos-cadastro
    const navigate = useNavigate();
    function desmontarComponente() {
        navigate("/login-pos-cadastro")
    }

    return (
        <div className="outlet-components">
        <div className='plano-de-fundo-tela
        p-8
        flex
        flex-col
        gap-4
        w-full
        h-full
        items-center'>
            <h3 className='
            text-3xl font-bold
            '>
                Cadastre-se
            </h3>
        
            <form className='
            bg-green-500
            w-1/2
            p-4
            flex
            flex-col
            items-center
            gap-4
            h-fit
            rounded-lg'
            onSubmit={handleSubmit}>
                <label className={`
                text-sm
                leading-3
                text-red-500
                ${erroEmail ? 'block' : 'hidden'}`} 
                htmlFor="email">O e-mail deve seguir o formato nome@email.com</label>
                
                <input className={`
                p-2
                w-full
                text-green-900
                ${erroEmail ? 'borda-de-erro' : 'border-0'}
                `}
                onChange={handleInputEmail}
                name='email'
                type="text"
                placeholder='E-mail' />
                
                <input onChange={handleInputUserName} className='p-2 w-full text-green-900' type="text" placeholder='Nome de Usuário' />
                
                <input onChange={handleInputSenha1} className='p-2 w-full text-green-900' type="password" placeholder='Senha' />
                
                <label className={`
                text-sm
                leading-3
                text-red-500
                ${erroSenha ? 'block' : 'hidden'}`} 
                htmlFor="senha2">As senhas não coincidem</label>
                
                <input className={`
                p-2
                w-full
                text-green-900
                ${erroSenha ? 'borda-de-erro' : 'border-0'}
                `}
                onChange={handleInputSenha2}
                name='senha2'
                
                type="password"
                placeholder='Repita a Senha' />



                <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold'
                type='submit'>
                    <p>
                        Cadastrar
                    </p>
                    
                </button>
            
            </form>
        
        </div>
    </div>
    );
};

export default Registrar;
