import React from 'react';
import { NavLink } from 'react-router-dom';

import { useListaDePostagens } from '../hooks/useListaDePostagens';


interface ListaDePostagensProps {
    reRenderizar: number;
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar, setClicouEmLinks }) => {

    const { listaDePosts, semPosts } = useListaDePostagens();
    
    
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