import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface ListaDePostagensProps {
    reRenderizar: number;
    setClicouEmLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListaDePostagens: React.FC<ListaDePostagensProps> = ({ reRenderizar, setClicouEmLinks }) => {

    const [listaDePosts, setListaDePosts] = useState<any[]>([])

    useEffect(() =>{
        const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
        if (arrayDePosts !== null) {
           const parsedArray = JSON.parse(arrayDePosts);
           setListaDePosts(parsedArray)
        }

       
    }, [reRenderizar])

    function linkClicado() {
        setClicouEmLinks(true)
    }

    return (
        <div className='
        flex
        flex-col
        gap-2
        border
        border-green-200
        
        bg-green-900
        items-start
        '>

            <div className='
            p-4 
            border-b
            w-full
            border-white/50
            '>
                <p className='
                font-bold
                leading-4
                
                '>
                    Ordenadas desordens mentais</p>
            </div>

            <ul className='
            p-4
            px-8
            flex
            flex-col
            gap-2
            list-disc
            '>
                {listaDePosts.map((item, index) => (
                    <li key={index} 
                    className={`
                    hover:underline
                    hover:scale-105
                    hover:text-green-300
                    `}>
                        <NavLink onClick={linkClicado} to={`/post/${item.titulo}`}>
                            {item.titulo}
                        </NavLink>
                    </li>
                ))}
            </ul>


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
