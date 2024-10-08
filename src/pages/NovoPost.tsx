import React, {useEffect, useState} from 'react';

interface arrayDeObjetosOG {
    titulo: string;
    corpo: string;
}

const NovoPost: React.FC = () => {

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

        setArrayDeObjetosOG(prevArray => [...prevArray, {titulo: itemTitle, corpo: itemBody }]);

            


    }

    useEffect(() => {
        console.log(arrayDeObjetosOG)
        localStorage.setItem("arrayDeObjetosOG", JSON.stringify(arrayDeObjetosOG))
    }, [arrayDeObjetosOG])

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
                onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Título</label>
                    <input onChange={handleInputTitle} type="text" name='titulo' id="titulo"/>
                    
                    <label htmlFor="novo-post">Corpo do Texto</label>
                    <textarea onChange={handleInputBody} name="novo-post" id="novo-post" />
                    
                
                    <button type='submit'>Postar</button>
                </form>
            </div>

           
            
        </div>
    );

};

export default NovoPost;