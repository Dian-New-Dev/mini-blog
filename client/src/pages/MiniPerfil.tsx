import React, { useEffect, useState, useContext } from 'react';
import { UserNameContext } from '../context/userNameContext';
import { Link } from 'react-router-dom';


interface Props {
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiniPerfil: React.FC<Props> = ({setClicouEmLinks}) => {
    
    //contexto para saber nome de usuario
    const usuarioCtxt = useContext(UserNameContext)
    
    //estado para armazenar endereço da foto de perfil
    const [fotoDePerfil, setFotoDePerfil] = useState<string>('')



    function clicouNoNome() {
        setClicouEmLinks(true)
    }
    
    
    
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
                    <button onClick={clicouNoNome} className='font-bold'>{usuarioCtxt?.userNameCtx}</button>
                </Link>
                
                <p className='italic'>Que tal adicionar uma descrição?</p>
            </div>
        </div>
        
    );
};

export default MiniPerfil;
