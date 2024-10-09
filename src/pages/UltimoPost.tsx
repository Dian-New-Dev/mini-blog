import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface arrayRecuperado { //para tipagem de array de objetos
    titulo: string;
    corpo: string;
}

const UltimoPost: React.FC = () => {
    const params = useParams();

    const [arrayRecuperado, setArrayRecuparedo] = useState<arrayRecuperado[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [corpo, setCorpo] = useState<string>('');

    useEffect(() => {
        // Carregar dados do localStorage ao montar o componente
        const savedPosts = localStorage.getItem('arrayDeObjetosOG');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            setArrayRecuparedo(posts);
            montarPost(posts);
        }
    }, [])

    function montarPost(posts) {
        const postsLenght = posts.length;
        setTitulo(posts[postsLenght -1].titulo) 

        setCorpo(posts[postsLenght -1].corpo) 

        
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

export default UltimoPost;
