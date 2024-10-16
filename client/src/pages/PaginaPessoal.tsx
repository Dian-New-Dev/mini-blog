import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useContext } from "react";
import { LoginContext } from "../context/loginContext";

const PaginaPessoal: React.FC = () => {

    const { id } = useParams();

    const loginCtxt = useContext(LoginContext)
    const navigate = useNavigate();

    //checar se o usuario de fato logou
    //se não logou, retorna para homepage
    useEffect(() => {
        if (loginCtxt?.isUserLoggedIn === false) {
            navigate('/')
        }
    }, [loginCtxt, navigate])

    //se nao logou, isso aqui garante que nada é renderizado
    //antes de direcionar para '/'
    if (loginCtxt?.isUserLoggedIn === false) {
        return null;
    }

    return (
        <h1>Olá, esta é sua página pessoal, {id}</h1>
    )

};

export default PaginaPessoal;
