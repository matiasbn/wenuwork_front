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
        axios.get('http://localhost:3000/autos/')
            .then(function (response) {
                // console.log(response.data.auto);
                let autosArray = response.data.auto
                var obtenerTemplate = $('#obtenerTemplate');
                var autosRow = $('#autosRow');

                for (i = 0; i < autosArray.length; i++) {
                    obtenerTemplate.find('.auto-id').text(autosArray[i]._id);
                    obtenerTemplate.find('.auto-marca').text(autosArray[i].marca);
                    obtenerTemplate.find('.auto-modelo').text(autosArray[i].modelo);
                    obtenerTemplate.find('.auto-anio').text(autosArray[i].year);
                    autosRow.append(obtenerTemplate.html())
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    },

    insertar: function () {
        let insertarTemplate = $('#insertarTemplate');
        let marcaIN = insertarTemplate.find('.marcaPOST').val()
        let modeloIN = insertarTemplate.find('.modeloPOST').val()
        let anioIN = insertarTemplate.find('.anioPOST').val()
        axios.post('http://localhost:3000/autos', {
            marca: marcaIN,
            modelo: modeloIN,
            year: anioIN
        })
            .then(function (response) {
                insertarTemplate.find('.id-generado').text(response.data.auto._id);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    editar: function () {
        let editarTemplate = $('#editarTemplate');
        let idPUT = editarTemplate.find('.idPUT').val()
        let marcaPUT = editarTemplate.find('.marcaPUT').val()
        let modeloPUT = editarTemplate.find('.modeloPUT').val()
        let anioPUT = editarTemplate.find('.anioPUT').val()
        let putURL = 'http://localhost:3000/autos/' + idPUT
        console.log(putURL);
        axios.put(putURL, {
            marca: marcaPUT,
            modelo: modeloPUT,
            year: anioPUT
        })
            .then(function (response) {
                console.log(response);
                editarTemplate.find('.auto-id-editado').text(response.data.auto._id);
                editarTemplate.find('.auto-marca-editado').text(response.data.auto.marca);
                editarTemplate.find('.auto-modelo-editado').text(response.data.auto.modelo);
                editarTemplate.find('.auto-anio-editado').text(response.data.auto.year);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    eliminar: function () {
        let eliminarTemplate = $('#eliminarTemplate');
        let idEliminar = eliminarTemplate.find('.idEliminado').val();
        axios.delete(`http://localhost:3000/autos/${idEliminar}`)
            .then(function (response) {
                console.log(response);
                eliminarTemplate.find('.auto-id-eliminado').text(response.data.auto._id);
                eliminarTemplate.find('.auto-marca-eliminado').text(response.data.auto.marca);
                eliminarTemplate.find('.auto-modelo-eliminado').text(response.data.auto.modelo);
                eliminarTemplate.find('.auto-anio-eliminado').text(response.data.auto.year);
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
