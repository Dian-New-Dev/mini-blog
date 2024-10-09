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

## Mapeamento de problemas

### Problema: como criar novo post

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


