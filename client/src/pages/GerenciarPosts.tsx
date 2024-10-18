import React, { useEffect, useState } from 'react';
import { useListaDePostagens } from '../hooks/useListaDePostagens';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const GerenciarPosts: React.FC = () => {

    const [reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks] = useOutletContext();


    const { listaDePosts, semPosts } = useListaDePostagens(reRenderizar);
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [postSelecionado, setPostSelecionado] = useState<object>({})
    
    function apagarPost(post) {
        console.log(post)
        setPostSelecionado(post)
        setMostrarModal(true)
    }

    function clickModal(decisao:number) {
        if (decisao === 0) {
            deletePost();
            setReRenderizar(prev => prev + 1)
        } else {
            setMostrarModal(false)
        }

    }

    function deletePost() {
        if (postSelecionado) {
            console.log('vamos apagar o seguinte post')
            console.log(postSelecionado)
            const id = postSelecionado._id;
            fetch(`http://localhost:5000/api/delete-post?id=${id}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Resposta do servidor não foi OK');
                    }
                    return response.json()
                })
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => console.error('Erro ao executar deleção:', err))

        }
    }

    function editarPost(post) {
        console.log(post)

    }
    

    return (
        <div className='relative'>

            <div className={`
                ${mostrarModal ? 'block' : 'hidden'}
                absolute
                top-0
                left-0
                grid
                place-items-center
                bg-gray-950/50
                `}>
                <div className='
                w-[300px]
                h-[300px]
                bg-green-950
                p-4'>
                    <p>Esta ação não poderá ser revertida. Tem certeza
                        de que deseja apagar este post?
                    </p>
                    <div className='flex gap-4'>
                        <button onClick={() => clickModal(0)}>Sim</button>
                        <button onClick={() => clickModal(1)}>Cancelar</button>
                    </div>
                </div>

            </div>

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
