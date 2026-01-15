document.addEventListener('alpine:init',()=>{

    Alpine.data('datosApp',()=>({
        cargando: false,
        edicion: false,
        id: 0,
        publicaciones: [],
        publicacion: {},
        async cargar() {
            var self = this;
            self.cargando = true;
            try {
                const publicaciones = await serviciosGraphQL.obtenerPublicacionesIndex();
                self.publicaciones = publicaciones;
            } catch (e) {
                console.log(e);
            }
            finally {
                self.cargando = false;
            }
        }
    }));

});