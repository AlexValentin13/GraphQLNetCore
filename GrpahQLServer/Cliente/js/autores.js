document.addEventListener('alpine:init',()=>{

    Alpine.data('datosApp',()=>({
        cargando: false,
        edicion: false,
        id: 0,
        formulario: {
            nombre: '',
            apellidos: '',
            correoElectronico: '',
            salario: 0
        },
        autores: [],
        autor: {},
        async cargar() {
            var self = this;
            self.cargando = true;
            try {

                const autores = await serviciosGraphQL.obtenerAutores();
                self.autores = autores;

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
        async editar(autorEditar) {
            var self = this;
            this.id = autorEditar.id;
            this.edicion = true;
            self.cargando = true;
            try {

                const autor = await serviciosGraphQL.obtenerAutor(autorEditar.id);
                self.formulario.nombre = autor.nombre;
                self.formulario.apellidos = autor.apellidos;
                self.formulario.correoElectronico = autor.correoElectronico;                
                self.formulario.salario = autor.salario;

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
            this.formulario.apellidos = '';
            this.formulario.correoElectronico = '';
            this.formulario.salario = 0;
        },
        async guardar() {
            var self = this;

            if (this.id) {
                //Actualización, el id es mayor a 0
                self.cargando = true;
                const variables = {
                    id: self.id,
                    autorInput: {
                        nombre: self.formulario.nombre,
                        apellidos: self.formulario.apellidos,
                        correoElectronico: self.formulario.correoElectronico,
                        salario: self.formulario.salario
                    }
                };

                try {

                    const autor = await serviciosGraphQL.actualizarAutor(variables);
                    self.autor = autor;

                    const autorIndex = self.autores.findIndex(u => u.id === autor.id);

                    if (autorIndex >= 0) {
                        self.autores[autorIndex] = {
                            id: autor.id,
                            nombre: autor.nombre,
                            apellidos: autor.apellidos,
                            correoElectronico: autor.correoElectronico,
                            salario: autor.salario,
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
                //Nuevo instructor, el id es igual a 0                
                self.cargando = true;

                const variables = {
                    autorInput: {
                        nombre: self.formulario.nombre,
                        apellidos: self.formulario.apellidos,
                        correoElectronico: self.formulario.correoElectronico,
                        salario: self.formulario.salario
                    }
                };

                try {

                    const autor = await serviciosGraphQL.crearAutor(variables);
                    self.autor = autor;

                    self.autores.push({
                        id: autor.id,
                        nombre: autor.nombre,
                        apellidos: autor.apellidos,
                        correoElectronico: autor.correoElectronico,
                        salario: autor.salario
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
        async eliminar(autorEliminar) {
            var self = this;
            this.id = autorEliminar.id;
            self.cargando = true;

            try {

                const resultado = await serviciosGraphQL.eliminarAutor(autorEliminar.id);                

                if (resultado) {
                    const autorIndex = self.autores.findIndex(u => u.id === this.id);

                    if (autorIndex >= 0) {

                        self.autores.splice(autorIndex, 1);
                    }
                }
                else {
                    console.log("No se puedo eliminar el autor.");
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