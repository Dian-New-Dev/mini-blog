class Post {
    constructor(titulo:string, corpo:string) {
        this.titulo = titulo;
        this.corpo = corpo; 
    }

    inserirnoArray(){

        arrayDeObjetos.push(this)
    }
}

const arrayDeObjetos = [{}]

console.log(arrayDeObjetos)
console.log(arrayDeObjetos.length)
console.log(arrayDeObjetos.length[0])


// const post1 = new Post('barbaridade', 'tche');
// post1.inserirnoArray();

// console.log(arrayDeObjetos)





export default Post;