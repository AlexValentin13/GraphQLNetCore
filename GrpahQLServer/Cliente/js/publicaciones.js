document.addEventListener('alpine:init', () => {
  Alpine.data('datosApp', () => ({
    cargando: false,
    edicion: false,
    id: 0,
    formulario: {
      titulo: '',
      contenido: '',
      imagenUrl: '',
      estado: '',
      rating: 0,
      categoriaId: 0,
      autorId: 0,
    },
    publicaciones: [],
    autores: [],
    estadosPublicacion: ['ACTIVA', 'REVISION', 'INACTIVA'],
    categorias: [],
    publicacion: {},
    async cargar() {
      var self = this;
      self.cargando = true;
      try {
        const publicaciones =
          await serviciosGraphQL.obtenerPublicacionesListado();
        self.publicaciones = publicaciones;
      } catch (e) {
        console.log(e);
      } finally {
        self.cargando = false;
      }
    },
    async agregar() {
      this.edicion = false;
      this.reiniciarFormulario();
      await this.inicializarCatalogos();
    },
    async editar(publicacionEditar) {
      var self = this;
      this.id = publicacionEditar.id;
      this.edicion = true;
      await self.inicializarCatalogos();
      self.cargando = true;
      try {
        const publicacion = await serviciosGraphQL.obtenerPublicacion(
          publicacionEditar.id
        );

        self.formulario.titulo = publicacion.titulo;
        self.formulario.contenido = publicacion.contenido;
        self.formulario.imagenUrl = publicacion.imagenUrl;
        self.formulario.estado = publicacion.estado;
        self.formulario.rating = publicacion.rating;
        self.formulario.categoriaId = publicacion.categoria.id;
        self.formulario.autorId = publicacion.autor.id;
      } catch (e) {
        console.log(e);
      } finally {
        self.cargando = false;
      }
    },
    reiniciarFormulario() {
      this.id = 0;
      this.formulario.titulo = '';
      this.formulario.contenido = '';
      this.formulario.imagenUrl = '';
      this.formulario.estado = '';
      this.formulario.rating = 0;
      this.formulario.categoriaId = 0;
      this.formulario.autorId = 0;
    },
    async inicializarCatalogos() {
      let self = this;
      if (this.autores.length <= 0 && this.categorias.length <= 0) {
        const { autores, categorias } =
          await serviciosGraphQL.obtenerCatalogos();
        this.autores = autores.items;
        this.categorias = categorias.items;
      }
    },
    async guardar() {
      var self = this;

      if (this.id) {
        //Actualización, el id es mayor a 0
        self.cargando = true;
        const variables = {
          id: self.id,
          publicacionInput: {
            titulo: self.formulario.titulo,
            contenido: self.formulario.contenido,
            estado: self.formulario.estado,
            rating: self.formulario.rating,
            imagenUrl: self.formulario.imagenUrl,
            autorId: self.formulario.autorId,
            categoriaId: self.formulario.categoriaId,
          },
        };

        try {
          const publicacion = await serviciosGraphQL.actualizarPublicacion(
            variables
          );
          self.publicacion = publicacion;

          const publicacionIndex = self.publicaciones.findIndex(
            (u) => u.id === publicacion.id
          );

          if (publicacionIndex >= 0) {
            self.publicaciones[publicacionIndex] = {
              titulo: publicacion.titulo,
              estado: publicacion.estado,
              rating: publicacion.rating,
            };
          }
          self.reiniciarFormulario();
        } catch (e) {
          console.log(e);
        } finally {
          self.cargando = false;
        }
      } else {
        //Nueva publicación, el id es igual a 0
        self.cargando = true;

        const variables = {
          publicacionInput: {
            titulo: self.formulario.titulo,
            contenido: self.formulario.contenido,
            estado: self.formulario.estado,
            rating: self.formulario.rating,
            imagenUrl: self.formulario.imagenUrl,
            autorId: self.formulario.autorId,
            categoriaId: self.formulario.categoriaId,
          },
        };

        try {
          const publicacion = await serviciosGraphQL.crearPublicacion(
            variables
          );
          self.publicacion = publicacion;

          self.publicaciones.push({
            id: publicacion.id,
            titulo: publicacion.titulo,
            estado: publicacion.estado,
            rating: publicacion.rating,
          });

          self.reiniciarFormulario();
        } catch (e) {
          console.log(e);
        } finally {
          self.cargando = false;
        }
      }
    },
    async eliminar(publicacionEliminar) {
      var self = this;
      this.id = publicacionEliminar.id;
      self.cargando = true;

      try {
        const resultado = await serviciosGraphQL.eliminarPublicacion(
          publicacionEliminar.id
        );

        if (resultado) {
          const publicacionIndex = self.publicaciones.findIndex(
            (u) => u.id === this.id
          );

          if (publicacionIndex >= 0) {
            self.publicaciones.splice(publicacionIndex, 1);
          }
        } else {
          console.log('No se puedo eliminar la publicación.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        self.cargando = false;
      }
    },
  }));
});
