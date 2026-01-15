/*******************************************
 *                                         *             
 *         CONSULTAS AUTORES          *
 *                                         *
 ******************************************/
const GET_AUTORES = `query getAutores{
    autores {
        items{
            id
            nombre
            apellidos
            correoElectronico
        }
    }
   }`;

const GET_AUTOR = `query getAutor($id: Int!){
       autor(id:$id) {
           id
           nombre
           apellidos
           correoElectronico
           salario
       }
   }`;

const ADD_AUTOR = `
mutation createAutor($autorInput:AutorInputTypeInput!) {
    autor:createAutor(inputAutor: $autorInput) {
        id
        nombre
        apellidos
        correoElectronico
        salario
    }
}`;

const UPDATE_AUTOR = `mutation updateAutor($id:Int!, $autorInput:AutorInputTypeInput!) {
    autor:updateAutor(id: $id, inputAutor: $autorInput) {
        id
        nombre
        apellidos
        correoElectronico
        salario
    }
}`;

const DELETE_AUTOR = `mutation deleteAutor($id: Int!){
       resultado: deleteAutor(id:$id)
   }`;


/*******************************************
*                                         *             
*         CONSULTAS CATEGORÍAS            *
*                                         *
******************************************/
const GET_CATEGORIAS = `query getCategorias{
    categorias {
        items{
            id
            nombre
        }
    }
   }`;

const GET_CATEGORIA = `query getCategoria($id: Int!){
       categoria(id:$id) {
           id
           nombre
       }
   }`;

const ADD_CATEGORIA = `
mutation createCategoria($categoriaInput:CategoriaInputTypeInput!) {
    categoria: createCategoria(inputCategoria: $categoriaInput) {
        id
        nombre
    }
}`;

const UPDATE_CATEGORIA = `mutation updateCategoria($id:Int!, $categoriaInput: CategoriaInputTypeInput!) {
    categoria:updateCategoria(id: $id, inputCategoria: $categoriaInput) {
        id
        nombre
    }
}`;

const DELETE_CATEGORIA = `mutation deleteCategoria($id: Int!){
       resultado: deleteCategoria(id:$id)
   }`;


/*******************************************
*                                         *             
*         CONSULTAS PUBLICACIONES         *
*                                         *
******************************************/
const GET_PUBLICACIONES_INDEX = `query getPublicaciones{
    publicaciones(where: {estado:{eq:REVISION}}) {
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
        nodes {
            id
            imagenUrl
            titulo
            estado
            autor{
                nombre
            }
            categoria{
                nombre
            }
       }
    }
   }`;


const GET_PUBLICACIONES_LISTADO=`query getPublicaciones{
    publicaciones( order: { titulo:ASC}) {
        items{
            id
            titulo
            estado
            rating
        }
    }
   }`;


const GET_CATALOGOS_PUBLICACION=`query getCatalogos{
    autores: autores{
      items{
      id
      nombre
      apellidos
      }
    }
    categorias {
      items{
        id
        nombre
      }
    }
  }`;

const GET_PUBLICACION = `query getPublicacion($id: Int!){
    publicacion(id:$id) {
        id
        titulo
        imagenUrl
        estado
        contenido
        rating
        categoria{
          id
        }
        autor {
          id
        }
    }
}`;

const ADD_PUBLICACION = `
mutation createPublicacion($publicacionInput:PublicacionInputTypeInput!) {
    publicacion:createPublicacion(inputPublicacion: $publicacionInput) {
        id
        titulo
        estado
        rating
    }
}`;

const UPDATE_PUBLICACION = `mutation updatePublicacion($id:Int!, $publicacionInput: PublicacionInputTypeInput!) {
 publicacion:updatePublicacion(id: $id, inputPublicacion: $publicacionInput) {
    id
    titulo
    estado
    rating
 }
}`;

const DELETE_PUBLICACION = `mutation deletePublicacion($id: Int!){
    resultado: deletePublicacion(id:$id)
}`;

