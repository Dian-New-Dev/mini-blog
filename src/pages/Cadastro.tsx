import React, { useEffect, useState } from 'react';

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

    function handleSubmit(e: React.FormEvent) {
        //impede recarregar pagina
        e.preventDefault();

        //compila os dados em um objeto
        const preCadastro = {
            correio: email,
            usuario: userName,
            senha1: password1,
            senha2: password2,
        }

        //loga os dados para debugging
        console.log(preCadastro)

        //verificar se dados são validos
        verificarDados(preCadastro)
    }

    
    //verificao de e-mail e senha
    const [erroEmail, setErroEmail] = useState<boolean>(false);
    const [erroSenha, setErroSenha] = useState<boolean>(false);
    function verificarDados(preCadastro) {
        // Inicializa as variáveis de erro locais
        let localErroEmail = false;
        let localErroSenha = false;
    
        // Verificar se o email tem @
        if (!preCadastro.correio.includes('@')) {
            console.log('email não tem arroba');
            localErroEmail = true;
            setErroEmail(true);  // Atualiza o estado visual
        } else {
            setErroEmail(false);  // Reseta o estado visual se o email for válido
        }
    
        // Verificar se as senhas são iguais
        if (preCadastro.senha1 !== preCadastro.senha2) {
            console.log('senhas são diferentes');
            localErroSenha = true;
            setErroSenha(true);  // Atualiza o estado visual
        } else {
            setErroSenha(false);  // Reseta o estado visual se as senhas forem iguais
        }

        //futura verificação: nome de usuario ou email
        //ja cadastrados?
    
        // Verifica se houve algum erro localmente
        if (localErroEmail || localErroSenha) {
            console.log('ao menos uma das condições falhou');
            // Os erros já foram renderizados para o usuário corrigir
        } else {
            // Dados válidos, armazena no localStorage
            armazenarDados(preCadastro);
        }
    }

    function armazenarDados(preCadastro) {
        console.log('chegou aqui, hora de armazenr os dados')

        //converter dados em um item de array para o primeiro user
        const arrayDeUsers = [
            preCadastro
        ]

        //ou adicionar na lista de usuarios para users posteriores
        
        //salvar dados no localStorage
        localStorage.setItem("usuarios", JSON.stringify(arrayDeUsers))
        
        
        //passar para componente de transição

    }

    return (
        <div className="outlet-components">
        <div className='
        flex
        flex-col
        gap-4
        w-full
        h-fit
        items-center'>
            <h4 className='
            text-3xl font-bold
            '>
                Cadastre-se
            </h4>
        
            <form className='
            bg-green-400
            w-1/2
            p-4
            flex
            flex-col
            items-center
            gap-4
            h-fit'
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



                <button className='
                bg-green-800
                w-[200px]
                py-2
                font-bold
                text-green-100
                hover:bg-green-900'
                type='submit'>
                    Cadastrar
                </button>
            
            </form>
        
        </div>
    </div>
    );
};

export default Registrar;
