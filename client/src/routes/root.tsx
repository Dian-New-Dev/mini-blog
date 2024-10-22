
import React, {useEffect, useState, useRef} from "react";
import { Outlet, Link } from "react-router-dom";
import ListaDePostagens from "../pages/ListaDePostagens";
import UltimoPost from "../pages/OutletPlaceHolder";

import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import MiniPerfil from "../pages/MiniPerfil";
import OutletPlaceHolder from "../pages/OutletPlaceHolder";
import TesteAPI from "../pages/TesteAPI";



const Root: React.FC = () => {

    //lógica do video
    const videoRef = useRef<HTMLVideoElement>(null)

    const rodarVideo = () => {
        if (videoRef.current) {
            console.log(videoRef.current); // Verifique a referência do vídeo
            videoRef.current.play().catch((error) => console.error('Erro ao reproduzir o vídeo:', error));
        }
    };

    function iniciarVideo() {
        rodarVideo();
    }


    const loginCtxt = useContext(LoginContext)

    useEffect(() => {
        // vazio, mas se tirar o lista de postagens
        //não rerenderiza apos novo post
    }, [loginCtxt])

    //controlar atualizacao da lista de postagens
    const [reRenderizar, setReRenderizar] = useState<number>(0);
    useEffect(() => {
        //vazio, apenas para rerenderizar
        //console.log('valor de rerenderizar = ' + reRenderizar)
    }, [reRenderizar])

    const [ultimoPost, setUltimoPost] = useState<string>('');
    useEffect(() => {
        console.log(`aqui no pai o valor de ultimopost é ` + ultimoPost)
    }, [ultimoPost])

    


    //controlar renderização condicional de UltimoPost / Outlet
    const [clicouEmLinks, setClicouEmLinks] = useState<boolean>(false)
    function linkClicado() {
        setClicouEmLinks(true)
    }

    function clicouEmBleg() {
        setClicouEmLinks(false)

    }
    
    
    return (
        <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col min-h-screen relative overflow-hidden ">

            <div className="absolute top-0 left-0 z-20">
                <button className="text-white z-10" onClick={iniciarVideo}>
                    iniciarVideo
                </button>
            </div>

            <video autoPlay loop className="z-0 absolute w-full h-full top-0 left-0 background-universo" src={`/assets/videos/video.mp4`} ref={videoRef}></video>

            <div id="titulo" className="bg-black relative z-30 w-[95%] h-full
            flex flex-col gap-6 items-center p-12 border-b-2 border-white/25 mb-4 mx-auto  ">
                <Link to={`/`} onClick={clicouEmBleg} className="">
                    <h1 className="text-5xl scale-150">
                        Infinita Tenebrae
                    </h1>
                </Link>

                <h2 className="text-2xl">
                    O corriqueiro aos olhos daquele que a tudo já viu
                </h2>
                


            </div>

            <div id="main-container" className="flex-grow w-full h-full flex gap-8 p-8">
                <div id="sidebar" className="plano-de-fundo-tela relative z-10 w-[25%] min-w-[300px] p-8 flex-grow text-green-200 flex flex-col gap-4">
                    <div id='painel-usuario' className="flex flex-col gap-2 border-b-2 border-white/25  p-4 items-start">
                        <h3 className="font-bold text-xl">Painel de Controle</h3>
                        <div className={`flex flex-col gap-2 pl-3 ${loginCtxt?.isUserLoggedIn ? 'hidden' : 'block'}`}>
                            <Link onClick={linkClicado} to="/login">
                                <p>Login</p>
                            </Link>
                            <Link onClick={linkClicado} to="/sign-up">
                                <p>Cadastre-se</p>
                            </Link>
                        </div>

                        <div className={`pl-3 ${loginCtxt?.isUserLoggedIn ? 'block' : 'hidden'}`}>
                            <button>Log Out </button>
                        </div>


                        <button onClick={linkClicado} className="bg-[#174936] rounded-lg ml-3 p-2 border border-gray-700 hover:bg-green-950 hover:scale-110 font-bold">
                            <Link to={loginCtxt?.isUserLoggedIn ? `/novo-post` : '/login'}>
                                <p>Novo Post</p>
                            </Link>
                        </button>

                    </div>

                    <div id="perfil-container" className={`
                    ${loginCtxt?.isUserLoggedIn ? 'block' : 'hidden'}
                    `}
                    >

                        <MiniPerfil setClicouEmLinks={setClicouEmLinks} />  
                    </div>

                    <nav className="">
                        <ul>
                            {loginCtxt?.isUserLoggedIn && <ListaDePostagens reRenderizar={reRenderizar} setClicouEmLinks={setClicouEmLinks} setUltimoPost={setUltimoPost} />}
                        </ul>
                    </nav>
                </div>

                <div id="outlet" className=" flex flex-col flex-grow w-[75%] h-full z-10">
                        {clicouEmLinks ?
                        <Outlet context={{ reRenderizar, setReRenderizar, clicouEmLinks, setClicouEmLinks, ultimoPost }} />

                        : <OutletPlaceHolder ultimoPost={ultimoPost}  />}
                        
                        
                </div>
            </div>

            <div id="outlet-footer-container" className="relative z-10 flex flex-col h-full justify-between gap-4 mx-auto bottom-0">
                <div className="p-4 text-center">
                    <a target="_blank" href="https://www.linkedin.com/in/diego-antunes-339648293/">
                        <p>
                            DA Web Dev - 2024
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
    
}

export default Root;

