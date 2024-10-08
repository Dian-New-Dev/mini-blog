import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Post from '../data/ArmazemDePosts';

const NovoPost: React.FC = () => {

    useEffect(() => {
        const post1 = new Post('barbaridade', 'tche');
        const post2 = new Post('lala', 'teetete')
        post1.inserirnoArray();
        post2.inserirnoArray();
    }, [])
    
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <p></p>
        // <div 
        // id="novo-post-container"
        // className='
        // grid
        // place-items-center
        // w-full
        // h-full'>
        //     <div>
        //         <form className='
        //         flex
        //         flex-col
        //         gap-4' 
        //         onSubmit={handleSubmit}>
        //             <label htmlFor="titulo">Título</label>
        //             <input onChange={handleInputTitle} type="text" name='titulo' id="titulo"/>
                    
        //             <label htmlFor="novo-post">Corpo do Texto</label>
        //             <textarea onChange={handleInputBody} name="novo-post" id="novo-post" />
                    
                
        //             <button type='submit'>Postar</button>
        //         </form>
        //     </div>
            
        // </div>
    );

};

export default NovoPost;