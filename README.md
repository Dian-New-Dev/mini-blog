# Mini Bleg

## Descrição

- Pequeno projeto pessoal para aprendizado da ferramente react router.
- Objetiva-se como um blog simples.

## Funcionalidades pretendidas:

1) Componentes nestados - feito;
2) Layouts nestados - feito;
3) Pagina inicial, pagina de login e postagens - feito;
4) Capacidade de criar novo post - feito;
5) Navbar atualiza-se a cada novo post - feito;
6) Cadastro de usuario e senha - feito;
7) Cadastrar e-mail envia e-mail para o usuário;
8) Passar logica de autenticação e user generated data para backend;
9) Passar lógica de armazenamento de dados para backend;


## Tech stack:

- Vite
- React
- Typsecript
- Tailwind
- React Router

## Mapeamento de problemas

### Problema: como criar novo post (resolvido)

~~- criar botao "nova postagem"
- abrir tela padrao com inputs para titulo e texto
- funcao que pega o valor dos inputs e lhes insere em un objeto
- nome do objeto: postagem(numero)
- construir objeto com classe JS
- estrutura objeto: titulo, corpo do texto, link
- link precisa ser o titulo em letra minuscula e sem espaço
- criar componente padrão que puxa o link e renderiza o objeto/postagem correspondente ao link
- cada objeto deve ter uma entrada na navbar~~

- Solução: uso de Navlinks para links dinamicos + localStorage para armazenar e acessar posts

### Problema: como implementar autenticação de usuário

- usuario cria conta
- localStorage: usuario e senha
- se "usuario" não está presente no localStorage, envia e-mail confirmando cadastro
- se "usuario" esta presente no localStorage, informar que usuario já está cadastrado
- o que fazer se usuario esqueceu senha?
- usuario tenta fazer login
- componente login checa se há um par correspondente ao usuario + senha inputados pelo usuario
- se não, informar do erro e apagar senha do campo de texto
- se sim, direcionar o usuário à um componente pessoal
- componente pessoal: edição de postagens (adicionar, deletar posts) e descrição de perfil
- localStorage: perfil de usuario
- se login, renderizar um componente no root exibindo perfil do usuário logado (quem sou eu, foto, etc)

### Problema: como transitar do localStorage para um banco de dados de posts e usuários

- armazenamento em local storage é provisório
- usar MongoDB

### Problema: como alcançar um design moderno

- design atual é feio e antiquado

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

2) Em react router, há vários componentes que não estão necessariamente linkados por parentagem. Isso dificulta a transmissão de dados entre eles via props. Encontramos um contorno a esse problema com useContext, o qual permite declarar props universalmente acessíveis a qualquer componente dentro da UI tree.

- criar arquivo context.tsx, declarando a variavel, tipando-a e lhe exportando junto com um provider

- encapsular o App ou ReactProvider em main com o provider

- importar o useContext e declarar uma variavel para receber a variavel Context no arquivo que precisar acessá-la

3) o uso de context provou-se problemático e desnecessário. Usamos props passadas do root para componentes filho diretos e para rotas dentro do Outlet, usou-se método do react router nativo para passar props ao Outlet:

```

                    <Outlet context={[reRenderizar, setReRenderizar]} />


```

4) Ao adicionar uma nova postagem no componente NovoPost, o estado de ListaDePostagens não era atualizado corretamente. O valor exibido de listaDePosts estava sempre um passo atrás, mostrando o estado anterior após a alteração do valor de reRenderizar. 

Isso ocorreu porque a atualização do localStorage e do estado arrayDeObjetosOG não estava sincronizada com a chamada de setReRenderizar, levando a uma renderização atrasada no componente ListaDePostagens.

Para resolver esse problema, as seguintes alterações foram feitas:

- Atualização do Estado reRenderizar: A chamada para setReRenderizar foi movida para dentro do handleSubmit do componente NovoPost, garantindo que o estado reRenderizar seja atualizado após a nova postagem ser armazenada no localStorage. Isso assegurou que o componente ListaDePostagens reagisse ao estado mais recente.

- Carregamento Inicial do Estado: Ao carregar os dados do localStorage no useEffect, a atualização do estado arrayDeObjetosOG foi feita e setReRenderizar foi chamado para garantir que o componente ListaDePostagens refletisse as postagens carregadas imediatamente.

Essas alterações garantiram que a renderização de ListaDePostagens estivesse sempre sincronizada com as alterações no estado, resultando em uma atualização imediata após a adição de novas postagens.

5) CSS: flex-grow faz com que um dos items dentro de um container flex cresça o máximo possível dentro do mesmo.

6) useNavigate (hook do react router) permite "forçar" a aplicação a acessar um link específico após determinado evento.

7) params, funcionalidade do react router, permite formar links dinâmicos.

## Continuidade

- posts agora sao linkados a usuarios

- lista de posts so aparece se houver usuario logado e se usuario ja fez algum post

- oferecer link para usuario deslogar

- oferecer forma do usuario editar e/ou deletar posts

## Backend

1) De acordo com o Co-Pilot do Windows, as melhores opções de backend para meu projeto são:

- Node.JS + Express: estabelece o servidor backend, gerencia rotas e faz requisições HTTP.

- Passport.js: middleware de autenticação, utilizado para cadastrar usuários e validar tentativas de login;

- MongoDB: banco de dados NoSQL, para armazenar posts e imagens. É ele quem armazenará dados de autenticação. O Passport.js apenas pega esses dados e realiza a autenticação.

## Aprendizado backend:

- server.js costuma ser a API, o ponto de entrada por onde o ambiente backend começa

- estava com um problema onde o frontend não conseguir pegar (fetch) os dados do backend. A solução foi trocar a url do fetch, de "/api" para o link direto "http://localhost:5000".

Isso gerou um problema de CORS policy, resolvido com

```
npm install cors
```

para instalar a bibliteca CORS, bem como sua importação no server.js:

```
const express = require('express');
const cors = require('cors'); // Importa a biblioteca cors
const app = express();

app.use(cors());
```

- Problema: O erro TypeError: postsCollection.filter is not a function ocorreu porque a variável postsCollection não era um array, resultando na falha ao tentar aplicar o método filter para filtrar postagens por usuário.
Solução: Ajustou-se a rota no backend para garantir que postsCollection fosse um array, utilizando await postsCollection.find({}).toArray() para obter todos os posts do banco de dados. Assim, foi possível aplicar o método filter corretamente para filtrar as postagens com base no nome do usuário.

- Criei um custom hook para fazer o fetch das postagens feitas pelo usuario, para que eu possa usar esses dados em varios componentes. Contudo, em componentes que precisam rerenderizar, o hook não acompanha a rerenderização junto com o resto do componente. para corrigir isso, incluí um argumento "rerenderizar" no hook, o qual deve ser passado por todo componente que for consumir este hook.

- fetch get não precisa declarar método, mas outros métodos precisam (post, delete, etc)

- para fazer fetch passando o id de um documento como param, deve-se importar ObjectId e usar new ObjectId(id)