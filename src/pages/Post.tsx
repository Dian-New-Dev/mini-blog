import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface arrayRecuperado { //para tipagem de array de objetos
    titulo: string;
    corpo: string;
}

const Post: React.FC = () => {

    const params = useParams();

    const [arrayRecuperado, setArrayRecuparedo] = useState<arrayRecuperado[]>([]);
    const [corpo, setCorpo] = useState<string>('');

    useEffect(() => {
        // Carregar dados do localStorage ao montar o componente
        const savedPosts = localStorage.getItem('arrayDeObjetosOG');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            setArrayRecuparedo(posts);
            montarPost(posts);
        }
    }, [params])

    function montarPost(posts) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].titulo === params.postId) {
                setCorpo(posts[i].corpo)
            }
        }
        console.log(posts[0].titulo)
    }


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
                    {params.postId}</h2>
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