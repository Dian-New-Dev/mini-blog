const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./mongo'); // Importa a função de conexão
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let usuariosCadastrados;

connectToDatabase().then((collection) => {
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

    // Rota get para teste
    app.get("/api", (req, res) => {
        console.log("API endpoint hit");
        res.json({ "users": ["userOne", "UserTwo", "userThree"] });
    });

    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
}).catch((error) => {
    console.error('Falha ao conectar ao MongoDB:', error);
});
