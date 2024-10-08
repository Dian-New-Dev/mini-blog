import React from 'react';
import { Link } from 'react-router-dom';

const NovoPost: React.FC = () => {

    return (
        <div 
        id="novo-post-container"
        className='
        grid
        place-items-center
        w-full
        h-full'>
            <div>
                <form className='
                flex
                flex-col
                gap-4' 
                action="#">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" name='titulo' id="titulo"/>
                    
                    <label htmlFor="novo-post">Corpo do Texto</label>
                    <textarea name="novo-post" id="novo-post" />
                    
                
                    <button type='submit'>Postar</button>
                </form>
            </div>
            
        </div>
    );

};

export default NovoPost;