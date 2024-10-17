import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListaDePostagens } from '../hooks/useListaDePostagens';

const Post: React.FC = () => {

    const { listaDePosts, semPosts } = useListaDePostagens();

    const [corpo, setCorpo] = useState<string>('');

    const params = useParams();
    const titulo = params.postId

    useEffect(() => {
        if (semPosts) {
            console.log('usuário sem posts, como você clicou aqui?')
        } else {
            for (let i = 0; i < listaDePosts.length; i++) {
                if (listaDePosts[i].titulo === titulo) {
                    setCorpo(listaDePosts[i].corpo)
                }
            }
        }

    }, [titulo, listaDePosts, semPosts])


    
    
    return (
        <div className='
        w-full
        h-full
        
        flex
        flex-col
        gap-8
        text-green-200
        p-12
        bg-green-950
        border-4
        border-double
        border-green-200
        
        '>

            <div id='titulo-container'>
                <h2 className='
                text-3xl
                font-bold
                '>
                    {titulo}</h2>
            </div>

            <div id='corpo-container' className=''>
                <p className='
                whitespace-pre-line	
                leading-7
                '>
                    {corpo}</p>
            </div>
            
           
           
           
        </div>
    );

};

export default Post;