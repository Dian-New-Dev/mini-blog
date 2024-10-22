import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListaDePostagens } from '../hooks/useListaDePostagens';

const Post: React.FC = () => {

    const { listaDePosts, semPosts } = useListaDePostagens();

    const [corpo, setCorpo] = useState<string>('');

    const params = useParams();
    const titulo = params.postId

    useEffect(() => {



            for (let i = 0; i < listaDePosts.length; i++) {
                if (listaDePosts[i].titulo === titulo) {
                    setCorpo(listaDePosts[i].corpo)
                }
            }


    }, [titulo, listaDePosts, semPosts])


    
    
    return (
        <div className='w-full h-full flex flex-col gap-8'>

                <div className="px-4 py-2 relative plano-de-fundo-tela" id="post-titulo">
                    <div className="w-[30px] h-[30px] clip-path-titulo-1 absolute left-0 top-0"></div>
                    <div className="w-[30px] h-[30px] clip-path-titulo-2 absolute right-0 bottom-0"></div>
                    <h3 className="text-3xl italic">{titulo}</h3>
                    <div className="text-right">
                        <p className="italic">Autor:</p>
                        <p className="italic">Data:</p>
                    </div>
                </div>

                <div id="post-corpo" className="leading-8 p-8 plano-de-fundo-tela relative">
                    <div className="w-[30px] h-[30px] clip-path-titulo-1 absolute left-0 top-0"></div>
                    <div className="w-[30px] h-[30px] clip-path-titulo-2 absolute right-0 bottom-0"></div>
                    <p>{corpo}</p>
                </div>
            
           
           
           
        </div>
    );

};

export default Post;