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
    const [semPosts, setSemPosts] = useState<boolean>(true)

    useEffect(() => {
        console.log(nomeDoUsuario); // Verifique se o nome do usuário está correto
        if (nomeDoUsuario) { // Verifique se o nome do usuário não está vazio
            fetch(`http://localhost:5000/api/posts?username=${nomeDoUsuario}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setListaDePosts(data);
                })
                .catch(err => console.error('Error fetching data:', err));
        }
    }, [nomeDoUsuario]);

    useEffect(() => {
        if (listaDePosts !== null) {
            console.log('este usuario tem posts')
           setSemPosts(false)
        } else {
            console.log('este usuario não tem posts')
            setSemPosts(true)
        }
    }, [listaDePosts])

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