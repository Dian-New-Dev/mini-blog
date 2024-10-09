import React, {useEffect, useState} from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

interface arrayDeObjetosOG { //para tipagem de array de objetos
    titulo: string;
    corpo: string;
}

const NovoPost: React.FC = () => {

    const navigate = useNavigate();

    const [reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks] = useOutletContext();

    const [itemTitle, setItemTitle] = useState<string[]>([]);
    const [itemBody, setItemBody] = useState<string[]>([]);
    const [arrayDeObjetosOG, setArrayDeObjetosOG] = useState<arrayDeObjetosOG[]>([]);

    function handleInputTitle(e:React.ChangeEvent<HTMLInputElement>) {
        setItemTitle(e.target.value)
    }

    function handleInputBody(e:React.ChangeEvent<HTMLInputElement>) {
        setItemBody(e.target.value)
    }
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const novoPost = { titulo: itemTitle, corpo: itemBody };
    
        // Atualiza o estado local antes de armazenar no localStorage
        const updatedArray = [...arrayDeObjetosOG, novoPost];
        setArrayDeObjetosOG(updatedArray);
    
        // Atualiza o localStorage com os novos dados
        localStorage.setItem("arrayDeObjetosOG", JSON.stringify(updatedArray));
    
        // Atualiza o estado que deve acionar a re-renderização
        setReRenderizar(prev => prev + 1);

        navigate("/")

        setClicouEmLinks(false)
    }
    

    useEffect(() => {
        // Carregar dados do localStorage ao montar o componente
        const savedPosts = localStorage.getItem('arrayDeObjetosOG');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            setArrayDeObjetosOG(posts);
            // Atualiza o reRenderizar aqui para refletir a mudança
            setReRenderizar(prev => prev + 1); // Para garantir que o estado atualize
        }
    }, []);
    

    useEffect(() => {
        if (arrayDeObjetosOG.length > 0) { //sem esse if, o useEffect resetaria o localstorage a cada montagem
            console.log(arrayDeObjetosOG)
            localStorage.setItem("arrayDeObjetosOG", JSON.stringify(arrayDeObjetosOG));
        }
    }, [arrayDeObjetosOG])

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