const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://diannewdev:dianPass@mini-blog.a7q0u.mongodb.net/?retryWrites=true&w=majority&appName=mini-blog";

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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    return client.db("mini-blog").collection("usuarios"); // Substitua "seuBancoDeDados" pelo nome do seu banco de dados
  
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error; // Lança o erro para ser tratado no servidor
  }
}
//run().catch(console.dir);

module.exports = connectToUsersCollection;