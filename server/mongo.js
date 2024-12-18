require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MongoDB_URI

if (!uri) {
  throw new Error("MongoDB URI is not defined in the environment variables.");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//conectar à coleção de usuarios
async function connectToUsersCollection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Conexao com colecao de usuarios bem sucedida");
    
    return client.db("mini-blog").collection("usuarios"); // Substitua "seuBancoDeDados" pelo nome do seu banco de dados
  
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error; // Lança o erro para ser tratado no servidor
  }
}

//conectar à coleção de posts
async function connectToPostsCollection() {
  try {
    await client.connect();
    await client.db("admin").command({ping: 1});
    console.log("Conexao com colecao de posts bem sucedida");
    
    return client.db("mini-blog").collection("posts");
    

  } catch (error) {
    console.error('erro ao conectar com mongodb/posts:', error)
    throw error;
  }
}

module.exports = {
  connectToUsersCollection,
  connectToPostsCollection
};