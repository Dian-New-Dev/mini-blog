import React, { useState, useContext, useEffect } from 'react';
import { useListaDePostagens } from '../hooks/useListaDePostagens';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserNameContext } from '../context/userNameContext';

interface ContextOutlet {
    reRenderizar: number;
    setReRenderizar: React.Dispatch<React.SetStateAction<number>>;
}

interface Post {
    _id: string;
    user: string;
    titulo: string;
    corpo: string;
    // Outras propriedades, se houver
}



const GerenciarPosts: React.FC = () => {
    // outlet context para atualizar rerenderizar se posts apagados ou editados
    const {reRenderizar, setReRenderizar} = useOutletContext<ContextOutlet>();

    //estado para guardar post clicado pelo usuario
    const [postSelecionado, setPostSelecionado] = useState<Post | null>(null)

    //logica para deletar post
    const { listaDePosts, semPosts } = useListaDePostagens(reRenderizar);

    console.log(semPosts)
    

    const [mostrarModal, setMostrarModal] = useState<boolean>(false);

    
    function apagarPost(post:Post) {
        console.log(post)
        setPostSelecionado(post)
        setMostrarModal(true)
    }

    function clickModal(decisao:number) {
        if (decisao === 0) {
            deletePost();
            setReRenderizar(prev => prev + 1)
            setMostrarModal(false)
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

    //logica para edicao de post:
        //contexto para saber nome de usuario

    const usuarioCtxt = useContext(UserNameContext)

    const [mostrarModalEdicao, setMostrarModdalEdicao] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState<string>();
    const [itemBody, setItemBody] = useState<string>();

    

    function editarPost(post:Post) {
        setPostSelecionado(post) //apenas para pegar id
        console.log('aqui na funcao editar post o valor de post é ' + JSON.stringify(post))
        setMostrarModdalEdicao(true)

    }

    function handleInputTitle(e:React.ChangeEvent<HTMLInputElement>) {
        setItemTitle(e.target.value)
    }

    function handleInputBody(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setItemBody(e.target.value)
    }

    // const [mostrarEdicaoConfirmada, setMostrarEdicaoConfirmada] = useState<boolean>(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (postSelecionado) {
            console.log('postSelecionado não parece estar vazio, eis seu valor: ' + postSelecionado)
            console.log('e agora eis o seu valor stringifado: ' + JSON.stringify(postSelecionado))
            const postAtualizado = {
                id: postSelecionado._id, //correto
                user: postSelecionado.user, // correto
                titulo: itemTitle , //// errado, temos que pegar valor atualizado
                corpo: itemBody, //// errado, temos que pegar valor atualizado
                
            };
            console.log('o valor de postatualizado é: ' + postAtualizado)
    
            try {
                console.log('o valor de postAtualizado sendo passado para fech é' + JSON.stringify(postAtualizado))
                const response = await fetch(`http://localhost:5000/api/edit-post?id=${postAtualizado.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify(postAtualizado)
                });
    
                if (response.ok) {
                    const result = await response.json();
                    console.log('Post editado com sucesso', result)
                } else {
                    console.error('Post não foi editado', response.statusText)
                }
            } catch (error) {
                console.error('erro ao editar post:', error)
            }
            
            setReRenderizar(prev => prev + 1);

        } else {
            console.log('postSelecionado parece ser nulo, eis o seu valor atual' + postSelecionado)
        }
        
        

        // setMostrarEdicaoConfirmada(true)
    }
    

    return (
        <div className='relative'>

            <div className={`
                ${mostrarModalEdicao ? 'block' : 'hidden'}
                grid
                place-items-center
                w-screen
                h-screen
                z-50
                `}>

                    <div className='bg-red-900 w-full h-full'>
                        <form className='
                            w-full
                            h-full
                            flex
                            flex-col
                            gap-2' 
                            onSubmit={handleSubmit}>
                                <label htmlFor="titulo">Título</label>
                                <input className='
                                text-green-950
                                p-2
                                '
                                //value={itemTitle}
                                onChange={handleInputTitle} type="text" name='titulo' id="titulo"/>
                                
                                <label htmlFor="novo-post">Texto</label>
                                <textarea className='
                                flex-grow
                                text-green-950
                                p-2
                                
                                '
                                //value={itemBody}
                                onChange={handleInputBody} name="novo-post" id="novo-post" />
                                
                            
                                <button className='
                                bg-blue-600
                                p-2
                                border
                                border-gray-700
                                hover:bg-blue-800
                                w-[200px]
                                mx-auto
                                font-bold
                                mt-1
                                
                                '
                                type='submit'>
                                    Postar</button>


                        </form>
                        <button className='
                                bg-blue-600
                                p-2
                                border
                                border-gray-700
                                hover:bg-blue-800
                                w-[200px]
                                mx-auto
                                font-bold
                                mt-1
                                
                                '
                                onClick={() => setMostrarModdalEdicao(false)}>
                                    Cancelar

                                </button>
                    </div>

            </div>

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
                                <button onClick={() => editarPost(item)}>Editar</button>
                            </div>
                        
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default GerenciarPosts;
