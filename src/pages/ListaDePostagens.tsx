import React, { useEffect, useState } from 'react';

const ListaDePostagens: React.FC = () => {

    const [listaDePosts, setListaDePosts] = useState<string[]>([])

    useEffect(() =>{
        const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
        if (arrayDePosts !== null) {
            mapearPosts(arrayDePosts)
        }

       
    }, [])

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
