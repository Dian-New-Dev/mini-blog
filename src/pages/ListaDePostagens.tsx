import React, { useEffect, useState } from 'react';

interface ListaDePostagensProps {
    reRenderizar: number;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ( {reRenderizar} ) => {

    const [listaDePosts, setListaDePosts] = useState<string[]>([])

    useEffect(() =>{
        console.log('foi chamada a funcao')
        const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
        if (arrayDePosts !== null) {
            mapearPosts(arrayDePosts)
        }

       
    }, [reRenderizar])

    function mapearPosts(array) {
        const parsedArray = JSON.parse(array);
        console.log(parsedArray[0]);

        const lista = parsedArray.map((item, index) => (
            <div key={index} className={``}>
                {item.titulo}
            </div>
        ));
        setListaDePosts(lista)

        }

    
    return (
        <div>
            {listaDePosts}
        </div>
        
    );
};

export default ListaDePostagens;
