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