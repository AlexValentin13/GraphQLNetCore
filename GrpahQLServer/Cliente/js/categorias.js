document.addEventListener('alpine:init',()=>{

    Alpine.data('datosApp',()=>({
        cargando: false,
        edicion: false,
        id: 0,
        formulario: {
            nombre: ''
        },
        categorias: [],
        categoria: {},
        async cargar() {
            var self = this;
            self.cargando = true;
            try {

                self.categorias = await serviciosGraphQL.obtenerCategorias();

            } catch (e) {
                console.log(e);
            }
            finally {
                self.cargando = false;
            }
        },
        agregar() {
            this.edicion = false;
            this.reiniciarFormulario();
        },
        async editar(categoriaEditar) {
            var self = this;
            this.id = categoriaEditar.id;
            this.edicion = true;
            self.cargando = true;
            try {

                const categoria = await serviciosGraphQL.obtenerCategoria(categoriaEditar.id);
                self.formulario.nombre = categoria.nombre;

            } catch (e) {
                console.log(e);
            }
            finally {
                self.cargando = false;
            }

        },
        reiniciarFormulario() {
            this.id = 0;
            this.formulario.nombre = '';
        },
        async guardar() {
            var self = this;

            if (self.id) {
                //Actualización, el id es mayor a 0
                self.cargando = true;
                const variables = {
                    id: self.id,
                    categoriaInput: {
                        nombre: self.formulario.nombre
                    }
                };

                try {

                    const categoria = await serviciosGraphQL.actualizarCategoria(variables);
                    self.categoria = categoria;
                    const categoriaIndex = self.categorias.findIndex(u => u.id === self.id);

                    if (categoriaIndex >= 0) {
                        self.categorias[categoriaIndex] = {
                            id: categoria.id,
                            nombre: categoria.nombre
                        };
                    }
                    
                    self.reiniciarFormulario();


                } catch (e) {
                    console.log(e);
                }
                finally {
                    self.cargando = false;
                }

            }
            else {
                //Nuevo, el id es igual a 0                
                self.cargando = true;

                const variables = {
                    categoriaInput: {
                        nombre: self.formulario.nombre
                    }
                };

                try {

                    const categoria = await serviciosGraphQL.crearCategoria(variables);
                    self.categoria = categoria;

                    self.categorias.push({
                        id: categoria.id,
                        nombre: categoria.nombre
                    });

                    self.reiniciarFormulario();


                } catch (e) {
                    console.log(e);
                }
                finally {
                    self.cargando = false;
                }

            }
        },
        async eliminar(categoriaEliminar) {
            var self = this;
            this.id = categoriaEliminar.id;
            self.cargando = true;

            try {

                const resultado = await serviciosGraphQL.eliminarCategoria(categoriaEliminar.id);                

                if (resultado) {
                    const categoriaIndex = self.categorias.findIndex(u => u.id === self.id);

                    if (categoriaIndex >= 0) {

                        self.categorias.splice(categoriaIndex, 1);
                    }
                }
                else {
                    console.log("No se puedo eliminar la categoría.");
                }


            } catch (e) {
                console.log(e);
            }
            finally {
                self.cargando = false;
            }

        }

    }));

});