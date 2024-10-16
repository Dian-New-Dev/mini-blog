import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UserNameContext } from '../context/userNameContext';


interface ListaDePostagensProps {
    reRenderizar: number;
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar, setClicouEmLinks }) => {

    //pegar nome do usuario
    const userCtxt = useContext(UserNameContext)
    const [nomeDoUsuario, setNomeDoUsuario] = useState<string>('')

    useEffect(() => {
        if (userCtxt?.userNameCtx) {
            setNomeDoUsuario(userCtxt?.userNameCtx)
        }
    }, [])

    //verificar se há array de posts do usuario
    const [listaDePosts, setListaDePosts] = useState<any[]>([])
    const [semPosts, setSemPosts] = useState<bolean>(true)

    useEffect(() =>{
        const arrayDePosts = localStorage.getItem(nomeDoUsuario)
        console.log(nomeDoUsuario)
        if (arrayDePosts !== null) {
           const parsedArray = JSON.parse(arrayDePosts);
           setListaDePosts(parsedArray)
           setSemPosts(false)
        } else {
            setSemPosts(true)
            console.log('parece que não há posts')
        }

       
    }, [nomeDoUsuario])

    function linkClicado() {
        setClicouEmLinks(true)
    }

    return (
        <div className='
        flex
        flex-col
        gap-2
        border
        border-green-200
        
        bg-green-900
        items-start
        '>

            <div className='
            p-4 
            border-b
            w-full
            border-white/50
            '>
                <p className='
                font-bold
                leading-4
                
                '>
                    Ordenadas desordens mentais</p>
            </div>

            <ul className='p-4 px-8 flex flex-col gap-2 list-disc'>
                {semPosts ? (
                    'Sem posts por enquanto. Quel tal começar a postar?'
                ) : (
                    listaDePosts.map((item, index) => (
                    <li key={index} className='hover:underline hover:scale-105 hover:text-green-300'>
                        <NavLink onClick={linkClicado} to={`/post/${item.titulo}`}>
                            {item.titulo}
                        </NavLink>
                    </li>
                    ))
                )}
            </ul>


        </div>
        
    );
};

export default ListaDePostagens;