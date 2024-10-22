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
        <div className={`p-4 w-full h-full flex flex-col gap-4`}>
            <h3 className="font-bold text-xl">Capitão à Bordo:</h3>
            <div className='w-[150px] pl-3'>
                <img className='pfp' src={fotoDePerfil} alt="Foto de perfil" />
            </div>

            <div className='w-full flex flex-col pl-3'>
                <Link to={`/my-page/${usuarioCtxt?.userNameCtx}`}>
                    <button onClick={clicouNoNome} className='font-bold underline pointer-events-auto'>{usuarioCtxt?.userNameCtx}</button>
                </Link>
                
                <p className='italic'>Que tal adicionar uma descrição?</p>
            </div>
        </div>
        
    );
};

export default MiniPerfil;
