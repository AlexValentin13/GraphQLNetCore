const serviciosGraphQL = {
    url: 'https://localhost:5001/graphql',
    useQueryAsync: async function (peticionGraphql) {
        return await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(peticionGraphql),
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    obtenerAutores: async function () {
        try {

            var peticion = {
                query: GET_AUTORES
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const autores = jsonData.data.autores.items;
            return autores;

        } catch (error) {
            console.log(error);
        }
    },
    obtenerAutor: async function (id) {

        try {

            var peticion = {
                query: GET_AUTOR,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);

            const jsonData = await response.json();

            const { autor } = jsonData.data;

            return autor;

        } catch (error) {
            console.log(error);

        }
    },
    crearAutor: async function (variables) {
        try {

            var peticion = {
                query: ADD_AUTOR,
                variables
            };
            
            const response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { autor } = jsonData.data;

            return autor;

        } catch (error) {
            console.log(error);

        }


    },
    actualizarAutor: async function (variables) {

        try {

            var peticion = {
                query: UPDATE_AUTOR,
                variables
            };
            

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { autor } = jsonData.data;

            return autor;

        } catch (error) {
            console.log(error);

        }

    },
    eliminarAutor: async function(id) {
        try {

            var peticion = {
                query: DELETE_AUTOR,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);            
            const jsonData = await response.json();
            const { resultado } = jsonData.data;
            return resultado;

        } catch (error) {
            console.log(error);

        }
    },
    obtenerCategorias: async function () {
        try {

            var peticion = {
                query: GET_CATEGORIAS
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const categorias = jsonData.data.categorias.items;
            return categorias;

        } catch (error) {
            console.log(error);
        }
    },
    obtenerCategoria: async function (id) {

        try {

            var peticion = {
                query: GET_CATEGORIA,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { categoria } = jsonData.data;
            return categoria;

        } catch (error) {
            console.log(error);

        }
    },
    crearCategoria: async function (variables) {
        try {

            var peticion = {
                query: ADD_CATEGORIA,
                variables
            };
            
            const response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { categoria } = jsonData.data;
            return categoria;

        } catch (error) {
            console.log(error);
        }
    },
    actualizarCategoria: async function (variables) {

        try {

            var peticion = {
                query: UPDATE_CATEGORIA,
                variables
            };
            

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { categoria } = jsonData.data;
            return categoria;

        } catch (error) {
            console.log(error);

        }

    },
    eliminarCategoria: async function(id) {
        try {

            var peticion = {
                query: DELETE_CATEGORIA,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { resultado } = jsonData.data;
            return resultado;

        } catch (error) {
            console.log(error);
        }
    },
    obtenerPublicacionesListado: async function () {
        try {

            var peticion = {
                query: GET_PUBLICACIONES_LISTADO
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const publicaciones  = jsonData.data.publicaciones.items;
            return publicaciones;

        } catch (error) {
            console.log(error);
        }
    },
    obtenerCatalogos: async function () {
        try {

            var peticion = {
                query: GET_CATALOGOS_PUBLICACION
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { autores,categorias } = jsonData.data;
            return {
                autores,
                categorias
            }

        } catch (error) {
            console.log(error);
        }
    },
    obtenerPublicacion: async function (id) {

        try {

            var peticion = {
                query: GET_PUBLICACION,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);

            const jsonData = await response.json();

            const { publicacion } = jsonData.data;

            return publicacion;

        } catch (error) {
            console.log(error);

        }
    },
    crearPublicacion: async function (variables) {
        try {

            var peticion = {
                query: ADD_PUBLICACION,
                variables
            };
            
            const response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { publicacion } = jsonData.data;

            return publicacion;

        } catch (error) {
            console.log(error);

        }


    },
    actualizarPublicacion: async function (variables) {

        try {

            var peticion = {
                query: UPDATE_PUBLICACION,
                variables
            };
            

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const { publicacion } = jsonData.data;

            return publicacion;

        } catch (error) {
            console.log(error);

        }

    },
    eliminarPublicacion: async function(id) {
        try {

            var peticion = {
                query: DELETE_PUBLICACION,
                variables: {
                    id
                }
            };

            let response = await this.useQueryAsync(peticion);            
            const jsonData = await response.json();
            const { resultado } = jsonData.data;
            return resultado;

        } catch (error) {
            console.log(error);

        }
    },
    obtenerPublicacionesIndex: async function () {
        try {

            var peticion = {
                query: GET_PUBLICACIONES_INDEX
            };

            let response = await this.useQueryAsync(peticion);
            const jsonData = await response.json();
            const publicaciones = jsonData.data.publicaciones.nodes;
            return publicaciones;

        } catch (error) {
            console.log(error);
        }
    }
};