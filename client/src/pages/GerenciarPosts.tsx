import React from 'react';
import { useListaDePostagens } from '../hooks/useListaDePostagens';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const GerenciarPosts: React.FC = () => {

    const [reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks] = useOutletContext();


    const { listaDePosts, semPosts } = useListaDePostagens(reRenderizar);

    console.log(listaDePosts)
    

    return (
        <div>
            <p>Seus posts</p>

            <div className=''>
                {
                    listaDePosts.map((item, index) => (
                        <div className='border bg-green-950 text-green-200 flex'>
                            <div className='w-[80%]'>
                                <div key={index} className='hover:underdivne hover:scale-105 hover:text-green-300'>
                                    <NavLink to={`/post/${item.titulo}`}>
                                        {item.titulo}
                                    </NavLink>
                                </div>
                                <div>
                                    {item.corpo}
                                </div>
                                
                            </div>
                            <div className='flex gap-4 w-[20%]'>
                                <button>Apagar</button>
                                <button>Editar</button>
                            </div>
                        
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default GerenciarPosts;
