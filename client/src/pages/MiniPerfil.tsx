import React, { useEffect, useState, useContext } from 'react';
import { UserNameContext } from '../context/userNameContext';
import { Link } from 'react-router-dom';

const MiniPerfil: React.FC = () => {
    
    //contexto para saber nome de usuario
    const usuarioCtxt = useContext(UserNameContext)
    
    //estado para armazenar endereço da foto de perfil
    const [fotoDePerfil, setFotoDePerfil] = useState<string>('')
    
    
    
    useEffect(() => {
        setFotoDePerfil('../assets/images/placeholder-pic.png')
    }, [])
    
    return (
        <div className={`
        w-full
        h-full
        bg-green-800
        border
        p-4
        flex
        gap-4
        `}>
            <div className='
            w-[25%]'>
                <img src={fotoDePerfil} alt="" />
            </div>

            <div className='w-[75%]'>
                <Link to={`/my-page/${usuarioCtxt?.userNameCtx}`}>
                    <p className='font-bold'>{usuarioCtxt?.userNameCtx}</p>
                </Link>
                
                <p className='italic'>Que tal adicionar uma descrição?</p>
            </div>
        </div>
        
    );
};

export default MiniPerfil;
