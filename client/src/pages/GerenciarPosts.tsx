import React from 'react';
import { useListaDePostagens } from '../hooks/useListaDePostagens';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const GerenciarPosts: React.FC = () => {

    const [reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks] = useOutletContext();


    const { listaDePosts, semPosts } = useListaDePostagens(reRenderizar);

    console.log(listaDePosts)

    function apagarPost(post) {
        console.log(post)
    }

    function editarPost(post) {
        console.log(post)

    }
    

    return (
        <div>
            <p>Seus posts</p>

            <div className=''>
                {
                    listaDePosts.map((item, index) => (
                        <div key={index} className='border bg-green-950 text-green-200 flex'>
                            <div className='w-[80%]'>
                                <div className='hover:underdivne hover:scale-105 hover:text-green-300'>
                                    <NavLink to={`/post/${item.titulo}`}>
                                        {item.titulo}
                                    </NavLink>
                                </div>
                                <div>
                                    {item.corpo}
                                </div>
                                
                            </div>
                            <div className='flex gap-4 w-[20%]'>
                                <button onClick={() => apagarPost(item)}>Apagar</button>
                                <button onClick={() => editarPost(item) }>Editar</button>
                            </div>
                        
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default GerenciarPosts;
