import React from 'react';

const ListaDePostagens: React.FC = () => {
    
    const arrayDePosts = localStorage.getItem("arrayDeObjetosOG")
    console.log(JSON.parse(arrayDePosts));

    return (
        <h1>Aqui deve ser a ListaDePostagens</h1>
    );
};

export default ListaDePostagens;
