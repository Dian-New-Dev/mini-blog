import { useState, useEffect, useContext } from "react";
import { UserNameContext } from "../context/userNameContext";

export const useListaDePostagens = () => {
    const userCtxt = useContext(UserNameContext);
    const [nomeDoUsuario, setNomeDoUsuario] = useState<string>('');
    const [listaDePosts, setListaDePosts] = useState<any[]>([]);
    const [semPosts, setSemPosts] = useState<boolean>(true);

    useEffect(() => {
        if (userCtxt?.userNameCtx) {
            setNomeDoUsuario(userCtxt.userNameCtx);
        }
    }, []);

    useEffect(() => {
        if (nomeDoUsuario) {
            fetch(`http://localhost:5000/api/posts?username=${nomeDoUsuario}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setListaDePosts(data);
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, [nomeDoUsuario]);

    useEffect(() => {
        setSemPosts(listaDePosts.length === 0);
    }, [listaDePosts]);

    return { listaDePosts, semPosts };






}