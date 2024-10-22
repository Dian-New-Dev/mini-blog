import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useListaDePostagens } from '../hooks/useListaDePostagens';


interface ListaDePostagensProps {
    reRenderizar: number;
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
    setUltimoPost: React.Dispatch<React.SetStateAction<string>>;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar, setClicouEmLinks, setUltimoPost }) => {
    
    useEffect(() => {    
       
        //vazio, apenas para re-renderizar

    }, [reRenderizar])


    

    const { listaDePosts, semPosts } = useListaDePostagens(reRenderizar);

    useEffect(() => {    
        setTimeout(() => {
            const index = listaDePosts.length
            setUltimoPost(`/post/${listaDePosts[(index-1)].titulo}`)    
        }, 1000);        


    }, [listaDePosts])



    
    function linkClicado() {
        setClicouEmLinks(true)
    }

    return (
        <div className='
        flex
        flex-col
        gap-2
        items-start
        '>

            <div className='
            p-4 
            border-t-2
            w-full
            border-white/25
            '>
                <h3 className='
                font-bold
                leading-4
                text-xl
                
                '>
                    Logs de Navegação</h3>
            </div>

            {<ul className='p-4 pl-10 px-8 flex flex-col gap-2 list-disc'>
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
            </ul>}


        </div>        
    );
};

export default ListaDePostagens;