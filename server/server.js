const express = require('express');
const cors = require('cors');
const { connectToUsersCollection, connectToPostsCollection } = require('./mongo');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let usuariosCadastrados;

connectToUsersCollection().then((collection) => {
    usuariosCadastrados = collection // armzena na varivel golbal

    // Rota para registro
    app.post('/api/register', async(req, res) => {
        const novoUsuario = req.body;
        console.log('Recebido novo usuário:', novoUsuario); // Log para verificar os dados recebidos
        try {
            const resultado = await usuariosCadastrados.insertOne(novoUsuario);
            console.log('Usuário inserido com sucesso:', resultado); // Log para confirmar inserção
            res.status(201).json(resultado);
        } catch (error) {
            console.error('Erro ao inserir usuário:', error); // Log para capturar erro
            res.status(500).json({ message: 'Erro ao inserir usuário', error: error.message });
        }
    });

    //rota para login
    app.post('/api/login', async(req, res) => {
        const dadosLogin = req.body;
        console.log('recebido nova tentativa de login', dadosLogin);
        

        try {
            //busca user no banco de dados
            const usuarioEncontrado = await usuariosCadastrados.findOne({ usuario: dadosLogin.usuario});

            if (usuarioEncontrado) {
                //verifica se senhas coincidem
                if (usuarioEncontrado.senha1 === dadosLogin.senha1) {
                    console.log('Login bem sucedido');
                    res.status(200).json({message: 'Login bem sucedido'});
                } else {
                    console.log('senha incorreta');
                    res.status(401).json({message: 'Senha incorreta'});
                }
            } else {
                console.log('Usuario não encontrado');
                res.status(404).json({message: 'Usuario não encotrzado'});
            }
        } catch (error) {
            console.error('Erro durante login:', error);
            res.status(500).json({message: 'Erro no servidor', error: error.message});
        }
        
    })

    // Rota get para teste
    app.get("/api", (req, res) => {
        console.log("API endpoint hit");
        res.json({ "users": ["userOne", "UserTwo", "userThree"] });
    });


}).catch((error) => {
    console.error('Falha ao conectar ao MongoDB/usuarios:', error);
});

connectToPostsCollection().then((collection) => {
    const postsCollection = collection // armzena na varivel golbal

    // Rota para submeter novo post
    app.post('/api/novo-post', async(req, res) => {
        const novoPost = req.body;
        console.log('Recebido novo post:', novoPost); // Log para verificar os dados recebidos
        try {
            const resultado = await postsCollection.insertOne(novoPost);
            console.log('Usuário inserido com sucesso:', resultado); // Log para confirmar inserção
            res.status(201).json(resultado);
        } catch (error) {
            console.error('Erro ao inserir usuário:', error); // Log para capturar erro
            res.status(500).json({ message: 'Erro ao inserir usuário', error: error.message });
        }
    });

    //rota para compilar postagens do usuario logado / ListaDePostagens
    app.get('/api/posts', async(req, res) => {
        const username = req.query.username;
        console.log('o nome do usuario para pegar posts é:' + username)

        const posts = await postsCollection.find({}).toArray(); // Obtém todos os posts
        const filteredPosts = posts.filter(post => post.user === username)
        res.json(filteredPosts)
    })

    //rota para pegar o post selecionado / Post.tsx
    app.get('/api/singlePost', async(req, res) => {
        const username = req.query.username;
        const title = req.query.title;
        console.log('chegou aqui os dados para requisição:')
        console.log(username)
        console.log(title)
        res.json({ "users": ["userOne", "UserTwo", "userThree"] });
    })

}).catch((error) => {
    console.error('Falha ao conectar ao MongoDB/posts:', error);
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
