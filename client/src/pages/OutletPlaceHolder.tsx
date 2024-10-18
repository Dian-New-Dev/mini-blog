import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/loginContext";
import { UserNameContext } from '../context/userNameContext';

interface Props {
    ultimoPost: string;
}

const OutletPlaceHolder: React.FC<Props> = ({ultimoPost}) => {

    const loginCtxt = useContext(LoginContext)
    
    //pegar nome do usuario
    const userCtxt = useContext(UserNameContext)
    const [nomeDoUsuario, setNomeDoUsuario] = useState<string>('')

    useEffect(() => {
        if (userCtxt?.userNameCtx) {
            setNomeDoUsuario(userCtxt?.userNameCtx)
        }
    }, [])
    


    const navigate = useNavigate();

    useEffect(() => {
        if (loginCtxt?.isUserLoggedIn) {
            // usuario logado, redirecionar para ultimo post
            navigate(ultimoPost)
        } else {
            //usuario nao logado
        }


        

    }, [nomeDoUsuario]);




    return (
        <div>
        <p>{ultimoPost}</p>
        </div>
    );

};

export default OutletPlaceHolder;
