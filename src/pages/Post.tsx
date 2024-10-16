import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserNameContext } from '../context/userNameContext';


interface arrayRecuperado { //para tipagem de array de objetos
    titulo: string;
    corpo: string;
}

const Post: React.FC = () => {

    //pegar nome do usuario
    const userCtxt = useContext(UserNameContext)
    const [nomeDoUsuario, setNomeDoUsuario] = useState<string>('')

    useEffect(() => {
        if (userCtxt?.userNameCtx) {
            setNomeDoUsuario(userCtxt?.userNameCtx)
        }
    }, [])

    //pegar params

    const params = useParams();

    const [arrayRecuperado, setArrayRecuparedo] = useState<arrayRecuperado[]>([]);
    const [corpo, setCorpo] = useState<string>('');

    
    useEffect(() => {
        // Carregar dados do localStorage ao montar o componente
        const savedPosts = localStorage.getItem(nomeDoUsuario);
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            setArrayRecuparedo(posts);
            
            montarPost(posts);
            console.log('chegamos e chamamos')
        }
    }, [nomeDoUsuario])

    function montarPost(posts) {
        console.log(posts)
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