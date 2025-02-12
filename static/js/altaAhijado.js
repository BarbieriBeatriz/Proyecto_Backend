const URL = "http://127.0.0.1:5000/"
//Al subir al servidor, deberá utilizarse la siguiente ruta.
//USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"

// Capturamos el evento de envío del formulario
document.getElementById('formulario-ahijado').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form
    var formData = new FormData(this);
    
    // Realizamos la solicitud POST al servidor
    fetch(URL + 'ahijados', {
        method: 'POST',
        body: formData // Aquí enviamos formData. Dado que formData puede contener archivos, no se utiliza JSON.
    })

    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
            //Si la respuesta es exitosa, convierte los datos de la respuesta a formato JSON.
            return response.json();
        } else {
            // Si hubo un error, lanzar explícitamente una excepción

            // para ser "catcheada" más adelante
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
            throw new Error('Error al agregar el ahijado.');
        }
    })

        //Respuesta OK, muestra una alerta informando que el ahijado se agregó correctamente y limpia los campos del formulario para que puedan ser utilizados para un nuevo ahijado.
        .then(function (data) {
            alert('✅ Ahijado agregado correctamente.', data);
            console.log('Ahijado agregado correctamente.');

            // document.getElementById('formulario-ahijado').reset();
        })

        // En caso de error, mostramos una alerta con un mensaje de error.
        .catch(function (error) {
            console.log("Hubo un problema con la petición Fetch:", error.message);
            console.error("Error al dar de alta ahijado:", error);

            alert('❌ Ocurrió un error al intentar agregar el ahijado.');
            document.getElementById("mensaje-error").style.color = "#C21518";
        })

        // Limpiar el formulario en ambos casos (éxito o error)
        .finally(function () {
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('fechaNacimiento').value = "";
            document.getElementById('enfermedad').value = "";
            document.getElementById('domicilio').value = "";
            document.getElementById('grupoSanguineo').value = "";
            document.getElementById('imagen').value = "";
            document.getElementById('donanteCompatible').value = "";
        });
})


