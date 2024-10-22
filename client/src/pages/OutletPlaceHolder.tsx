import React from 'react';

const OutletPlaceHolder: React.FC = () => {

    




    return (
        <div className='p-8 flex flex-col gap-4 h-full w-full flex-grow justify-center items-center plano-de-fundo-tela'>
            <h3 className='text-3xl'>
                Olá!
            </h3>

            <p>
                Este é um projeto em constante construção.
            </p>

            <p>
                Algums funcionalidades podem não ter sido 
                implementadas ainda. Nomeadamente:
            </p>

            <ul className='px-8 text-sm leading-4 '>
                <li className='text-lime-200'>Upload de foto de perfil;</li>
                <li className='text-lime-200'>Upload de imagens;</li>
                <li className='text-lime-200'>Registro da data de postagem;</li>
                <li className='text-lime-200'>Log-out. Por hora, basta atualizar 
                    a página para fechar sessão;</li>
                <li className='text-lime-200'>Autenticação de credenciais de usuário;</li>
            </ul>

            <p>
                Este foi um projeto de aprendizado em React,
                React Router e backend.
            </p>

            <p>
                As opções de login são simbólicas. O e-mail pode
                ser qualquer coisa. O importante é que o nome de 
                usuário seja único e as duas senhas coincidam. Use qualquer
                senha, não forneça dados reais.
            </p>

            <p>
                Posts serão salvos no banco de dados se meu computador
                estiver ligado mantendo o servidor.
            </p>
        </div>
    );

};

export default OutletPlaceHolder;
