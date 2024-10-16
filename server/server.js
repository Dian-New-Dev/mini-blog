const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./mongo') // Importa a função de conexão
const bodyParser = require('body-parser');
const { connect, mongo } = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());


connectToDatabase().then((usuariosCadastrados) => {
    //rota para registro
    app.post('/api/register', async(req, res) => {
        const novoUsuario = req.body;
        try{
            const resultado = await usuariosCadastrados.insertOne(novoUsuario);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({message: 'Erro inserindo usuario', error})
        }
    })


//isso é uma rota get para teste
app.get("/api", (req, res) => {
    console.log("API endpoint hit");
    res.json({ "users": ["userOne", "UserTwo", "userThree"] });
});

app.listen(5000, () => {
    console.log('server started on port 5000');
});

}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
