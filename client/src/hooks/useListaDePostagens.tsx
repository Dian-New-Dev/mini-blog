import { useState, useEffect, useContext } from "react";
import { UserNameContext } from "../context/userNameContext";

export const useListaDePostagens = (reRenderizar: number) => {
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
            fetch(`${import.meta.env.VITE_API_URL}/api/posts?username=${nomeDoUsuario}`)
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
    }, [nomeDoUsuario, reRenderizar]);

    useEffect(() => {
        setSemPosts(listaDePosts.length === 0);
    }, [listaDePosts]);

    return { listaDePosts, semPosts };






}