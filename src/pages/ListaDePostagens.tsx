import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface ListaDePostagensProps {
    reRenderizar: number;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar }) => {

    const [listaDePosts, setListaDePosts] = useState<any[]>([])

    useEffect(() =>{
        console.log(`useEffect de ListaDePostages acionado, pois reRenderizar tem valor ${reRenderizar}`)
        const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
        if (arrayDePosts !== null) {
           const parsedArray = JSON.parse(arrayDePosts);
           setListaDePosts(parsedArray)
        }

       
    }, [reRenderizar])

    return (
        <div>
            {listaDePosts.map((item, index) => (
                <div key={index} className={``}>
                    <NavLink to={`/post/${item.titulo}`}>
                        {item.titulo}
                    </NavLink>
                </div>
            ))}
        </div>
        
    );
};

export default ListaDePostagens;

// import React, { useEffect, useState } from 'react';

// interface ListaDePostagensProps {
//     reRenderizar: number;
// }

// const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar }) => {

//     const [listaDePosts, setListaDePosts] = useState<any[]>([])

//     useEffect(() =>{
//         console.log(`useEffect de ListaDePostages acionado, pois reRenderizar tem valor ${reRenderizar}`)
//         const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
//         if (arrayDePosts !== null) {
//             mapearPosts(arrayDePosts)
//         }

       
//     }, [reRenderizar])

//     function mapearPosts(array) {
//         const parsedArray = JSON.parse(array);
//         console.log(parsedArray[0]);

//         const lista = parsedArray.map((item, index) => (
//             <div key={index} className={``}>
//                 {item.titulo}
//             </div>
//         ));
//         setListaDePosts(lista)

//         }

    
//     return (
//         <div>
//             {listaDePosts}
//         </div>
        
//     );
// };

// export default ListaDePostagens;
