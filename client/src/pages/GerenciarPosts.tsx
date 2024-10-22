import React, { useState } from 'react';
import { useListaDePostagens } from '../hooks/useListaDePostagens';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
    const { listaDePosts } = useListaDePostagens(reRenderizar);
    

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
    const [mostrarModalEdicao, setMostrarModdalEdicao] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState<string>('');
    const [itemBody, setItemBody] = useState<string>('');

    

    function editarPost(post:Post) {
        setPostSelecionado(post) //apenas para pegar id
        setMostrarModdalEdicao(true)

    }

    function handleInputTitle(e:React.ChangeEvent<HTMLInputElement>) {
        setItemTitle(e.target.value)
    }

    function handleInputBody(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setItemBody(e.target.value)
    }

    const [mostrarEdicaoConfirmada, setMostrarEdicaoConfirmada] = useState<boolean>(false)
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
                    setMostrarEdicaoConfirmada(true)
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

    function terminarEdicao() {
        setMostrarEdicaoConfirmada(false)
        setMostrarModdalEdicao(false)
        setMostrarModal(false)
        setItemTitle('')
        setItemBody('')
    }
    

    return (
        <div className='relative flex flex-col gap-4'>

            <div id='edição' className={`
                ${mostrarModalEdicao ? 'block' : 'hidden'}
                grid
                place-items-center
                w-full
                h-full
                z-50
                relative
                `}>

                    <div className={`bg-gray-950 w-full h-full ${mostrarEdicaoConfirmada ? 'hidden' : 'block'}`}>
                        <form className='
                            w-full
                            h-full
                            flex
                            flex-col
                            gap-2
                            p-4
                            ' 
                            onSubmit={handleSubmit}>
                                <label htmlFor="titulo">
                                    <p>
                                        Título
                                    </p>
                                </label>
                                <input className='text-green-200 p-2 bg-green-900'
                                value={itemTitle}
                                onChange={handleInputTitle} type="text" name='titulo' id="titulo"/>
                                
                                <label htmlFor="novo-post">
                                    <p>
                                        Texto
                                    </p>
                                </label>
                                <textarea className='
                                flex-grow
                                text-green-200
                                bg-green-900
                                p-2
                                h-[500px]
                                '
                                value={itemBody}
                                onChange={handleInputBody} name="novo-post" id="novo-post" />
                                
                            
                                <button className='mb-16 bg-[#174936] w-[200px] mx-auto rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold'
                                type='submit'>
                                    <p>
                                        Postar
                                    </p>
                                </button>



                        </form>

                        <button onClick={() => setMostrarModdalEdicao(false)} className='centralizar-horizontal absolute bottom-6 bg-[#174936] w-[200px] mx-auto rounded-lg p-2 border border-gray-700 hover:bg-green-950 font-bold'>
                            <p>
                                Cancelar
                            </p>
                        </button>

                    </div>

                    <div className={`bg-red-900 w-full h-full ${mostrarEdicaoConfirmada ? 'block' : 'hidden'}`}>
                        <p>Post Editado com sucesso</p>
                        <button onClick={terminarEdicao}>OK</button>
                    </div>
            </div>

            <div id='deleção' className={`${mostrarModal ? 'block' : 'hidden'} absolute top-0 left-0 grid place-items-center`}>
                <div className='text-center flex flex-col gap-4 bg-gray-950 w-full h-full p-8 rounded-lg'>
                    
                    <p className='text-red-700'>Esta ação não poderá ser revertida.</p>
                    <p>Tem certeza de que deseja apagar este post?
                    </p>
                    
                    <div className='flex flex-col justify-center gap-4'>
                        <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold' onClick={() => clickModal(0)}>
                            <p>
                                Sim    
                            </p>
                        </button>
                        <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold' onClick={() => clickModal(1)}>
                            <p>
                                Cancelar    
                            </p>
                        </button>
                    </div>
                </div>

            </div>

            <h3 className='text-xl'>
                Seus posts
            </h3>

            <div className='flex flex-col gap-4'>
                {
                    listaDePosts.map((item, index) => (
                        <div key={index} className=' bg-green-950/25 text-green-200 flex'>
                            <div className='w-[80%] p-4 flex flex-col justify-center gap-4'>
                                <div className='hover:underdivne hover:scale-105 hover:text-green-300'>
                                    <NavLink to={`/post/${item.titulo}`}>
                                        <p className='text-lg underline'>
                                            {item.titulo}
                                        </p>
                                    </NavLink>
                                </div>
                                <div>
                                    <p className='pl-1'>
                                        {item.corpo}
                                    </p>
                                </div>
                                
                            </div>
                            <div className='flex flex-col gap-4 w-[20%]'>
                                <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold' onClick={() => apagarPost(item)}>Apagar</button>
                                <button className='bg-[#174936] rounded-lg p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold' onClick={() => editarPost(item)}>Editar</button>
                            </div>
                        
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default GerenciarPosts;
