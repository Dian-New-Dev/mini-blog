# Mini Bleg

## Descrição

- Pequeno projeto pessoal para aprendizado da ferramente react router.
- Objetiva-se como um blog simples.

## Funcionalidades pretendidas:

1) Componentes nestados - feito;
2) Layouts nestados - feito;
3) Pagina inicial, pagina de login e postagens - feito;
4) Capacidade de criar novo post;
5) Navbar atualiza-se a cada novo post;
6) Cadastro de usuario e senha;
7) Cadastrar e-mail envia e-mail para o usuário;


## Tech stack:

- Vite
- React
- Typsecript
- Tailwind
- React Router

## Problema: como criar novo post

- criar botao "nova postagem"
- abrir tela padrao com inputs para titulo e texto
- funcao que pega o valor dos inputs e lhes insere em un objeto
- nome do objeto: postagem(numero)
- construir objeto com classe JS
- estrutura objeto: titulo, corpo do texto, link
- link precisa ser o titulo em letra minuscula e sem espaço
- criar componente padrão que puxa o link e renderiza o objeto/postagem correspondente ao link
- cada objeto deve ter uma entrada na navbar

## Aprendizado

1) Estava incorendo no seguinte problema: a cada montagem ou atualização de página, o componente NovoPost resetava os dados salvos no local storage. Isso ocorria por causa da seguinte função

```
    useEffect(() => {
            console.log(arrayDeObjetosOG)
            localStorage.setItem("arrayDeObjetosOG", JSON.stringify(arrayDeObjetosOG));
    }, [arrayDeObjetosOG])

```

O intuito desse useEffect era salvar o arrayDeObjetosOG (contendo as postagens) no localStorage, sendo acionado sempre que arrayDebjetosOG era alterado.

Contudo, em re-montagens, o arrayDeObjetosOG esvaziava, o que fazia com que esse useEffect fosse acionado com o arrya vazio e o salvasse como tal no localStorage, por sobre valores anteriores.

A solução:

```
    useEffect(() => {
        if (arrayDeObjetosOG.length > 0) { //sem esse if, o useEffect resetaria o localstorage a cada montagem
            console.log(arrayDeObjetosOG)
            localStorage.setItem("arrayDeObjetosOG", JSON.stringify(arrayDeObjetosOG));
        }
    }, [arrayDeObjetosOG])

```

Aqui, o if garante que o localStorage só seja acionado se o array tiver um lenght maior que 0, impedindo que um array vazio seja salvo e, portanto, impendindo que essa funçaõ tente salvar no localstorage durante remontagem.

O resultado são os valores salvos no local storage persistindo remontagens.
