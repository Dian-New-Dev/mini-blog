import React from 'react';

const Registrar: React.FC = () => {
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
            action="#">
                <input className='p-2 w-full' type="text" placeholder='E-mail' />
                <input className='p-2 w-full' type="text" placeholder='Nome de Usuário' />
                <input className='p-2 w-full' type="password" placeholder='Senha' />
                <input className='p-2 w-full' type="password" placeholder='Repita a Senha' />



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
