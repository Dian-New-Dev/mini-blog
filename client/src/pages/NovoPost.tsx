import React, {useEffect, useState, useContext} from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { UserNameContext } from '../context/userNameContext';

interface ContextOutlet {
    reRenderizar: number;
    setReRenderizar: React.Dispatch<React.SetStateAction<number>>;
    clicouEmLinks: boolean;
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
    ultimoPost: string;
}

const NovoPost: React.FC = () => {


    const navigate = useNavigate();

    const {setReRenderizar, ultimoPost} = useOutletContext<ContextOutlet>();

    const [itemTitle, setItemTitle] = useState<string>();
    const [itemBody, setItemBody] = useState<string>();

    
    // useEffect(() => {
    //     console.log('componente NovoPost montado pois alterou-se titulo')
    // }, [itemTitle])

    // useEffect(() => {
    //     console.log('componente NovoPost montado pois alterou-se corpo')
    // }, [itemBody])

    

    function handleInputTitle(e:React.ChangeEvent<HTMLInputElement>) {
        setItemTitle(e.target.value)
    }

    function handleInputBody(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setItemBody(e.target.value)
    }
    
    //

    //pegar nome do usuario
    const userCtxt = useContext(UserNameContext)
    const [nomeDoUsuario, setNomeDoUsuario] = useState<string>('')

    useEffect(() => {
        if (userCtxt?.userNameCtx) {
            setNomeDoUsuario(userCtxt?.userNameCtx)
        }
    }, [])

        
    //
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoPost = { 
            user: nomeDoUsuario,
            titulo: itemTitle,
            corpo: itemBody,
            
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/novo-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoPost)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Post submetido com sucesso', result)
            } else {
                console.error('Post não foi submetido', response.statusText)
            }
        } catch (error) {
            console.error('erro ao submeter post:', error)
        }
        
        
       
    
        // Atualiza o estado que deve acionar a re-renderização
        setReRenderizar(prev => prev + 1);

        setTimeout(() => {
            navigate(ultimoPost) // navegar para o post a recem criado
        }, 1000);
        

        
    }

    return (
        <div 
        id="novo-post-container"
        className='
        grid
        place-items-center
        w-full
        h-full
        p-4
        text-center
        bg-green-950
        border-4
        border-double
        border-green-200
        text-green-200'>
            <div className='
            w-full
            h-full'>
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
                    onChange={handleInputTitle} type="text" name='titulo' id="titulo"/>
                    
                    <label htmlFor="novo-post">Texto</label>
                    <textarea className='
                    flex-grow
                    text-green-950
                    p-2
                    '
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
                    type='submit'>Postar</button>
                </form>
            </div>

           
            
        </div>
    );

};

export default NovoPost;