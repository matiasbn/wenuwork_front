App = {
    init: function () {
        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-obtener', App.obtener);
        $(document).on('click', '.btn-insertar', App.insertar);
        $(document).on('click', '.btn-editar', App.editar);
        $(document).on('click', '.btn-eliminar', App.eliminar);
    },

    obtener: function () {
        axios.get('http://localhost:3000/usuarios/')
            .then(function (response) {
                let usuariosArray = response.data.usuario
                var obtenerTemplate = $('#obtenerTemplate');
                var usuariosRow = $('#usuariosRow');

                for (i = 0; i < usuariosArray.length; i++) {
                    obtenerTemplate.find('.usuario-id').text(usuariosArray[i]._id);
                    obtenerTemplate.find('.usuario-nombre').text(usuariosArray[i].nombre);
                    obtenerTemplate.find('.usuario-rut').text(usuariosArray[i].rut);
                    obtenerTemplate.find('.usuario-marca-auto').text(usuariosArray[i].auto[0].marca);
                    obtenerTemplate.find('.usuario-modelo-auto').text(usuariosArray[i].auto[0].modelo);
                    obtenerTemplate.find('.usuario-anio-auto').text(usuariosArray[i].auto[0].year);
                    usuariosRow.append(obtenerTemplate.html())
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    },

    insertar: function () {
        let insertarTemplate = $('#insertarTemplate');
        let nombreIN = insertarTemplate.find('.nombrePOST').val()
        let rutIN = insertarTemplate.find('.rutPOST').val()
        let modeloAuto = insertarTemplate.find('.modeloAutoPOST').val()
        let marcaAuto = insertarTemplate.find('.marcaAutoPOST').val()
        let anioAuto = insertarTemplate.find('.anioAutoPOST').val()
        axios.post('http://localhost:3000/usuarios', {
            nombre: nombreIN,
            rut: rutIN,
            modelo: modeloAuto,
            marca: marcaAuto,
            year: anioAuto
        })
            .then(function (response) {
                insertarTemplate.find('.id-generado').text(response.data.usuario._id);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    editar: function () {
        let editarTemplate = $('#editarTemplate');
        let idPUT = editarTemplate.find('.idPUT').val()
        let nombrePUT = editarTemplate.find('.nombrePUT').val()
        let rutPUT = editarTemplate.find('.rutPUT').val()
        let modeloAuto = editarTemplate.find('.modeloAutoPUT').val()
        let marcaAuto = editarTemplate.find('.marcaAutoPUT').val()
        let anioAuto = editarTemplate.find('.anioAutoPUT').val()
        let putURL = 'http://localhost:3000/usuarios/' + idPUT
        console.log(putURL);
        axios.put(putURL, {
            nombre: nombrePUT,
            rut: rutPUT,
            modelo: modeloAuto,
            marca: marcaAuto,
            year: anioAuto
        })
            .then(function (response) {
                console.log(response);
                editarTemplate.find('.usuario-id-editado').text(response.data.usuario._id);
                editarTemplate.find('.usuario-nombre-editado').text(response.data.usuario.nombre);
                editarTemplate.find('.usuario-rut-editado').text(response.data.usuario.rut);
                obtenerTemplate.find('.usuario-marca-auto').text(usuariosArray[i].auto[0].marca);
                obtenerTemplate.find('.usuario-modelo-auto').text(usuariosArray[i].auto[0].modelo);
                obtenerTemplate.find('.usuario-anio-auto').text(usuariosArray[i].auto[0].year);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    eliminar: function () {
        let eliminarTemplate = $('#eliminarTemplate');
        let idEliminar = eliminarTemplate.find('.idEliminado').val();
        axios.delete(`http://localhost:3000/usuarios/${idEliminar}`)
            .then(function (response) {
                console.log(response);
                eliminarTemplate.find('.usuario-id-eliminado').text(response.data.usuario._id);
                eliminarTemplate.find('.usuario-nombre-eliminado').text(response.data.usuario.nombre);
                eliminarTemplate.find('.usuario-rut-eliminado').text(response.data.usuario.rut);
                eliminarTemplate.find('.usuario-auto-eliminado').text(response.data.usuario.auto);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
