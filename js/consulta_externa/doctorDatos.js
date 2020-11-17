 
 /* script con metodos ajax*/
 
 $('#selectorR').on('change', function() {    
    var valor = this.value; // instancia la variable con el valor seleccionado
    $('#agendaR').val(""); // Limpia las opciones anteriores
    $('#edadesR').val(""); // Limpia las opciones anteriores 
    $('#sedesR').empty(); // Limpia las opciones anteriores
    $('#especialidadR').empty(); // Limpia las opciones anteriores 
    $('#tiempoR').empty(); // Limpia las opciones anteriores 
    $('#citasR').empty(); // Limpia las opciones anteriores
    realizarProceso(valor); // llama la funcion y pasa el valor seleccionado
 });

 function realizarProceso(valor){

    var parametroM = { 
        medico: valor // pasa el valor a una llave
    }

    $.ajax({
        url: '../php/consulta_externa/doctorDatos.php', // direccion del archivo donde se realizara el backend
        type: 'POST', // metodo de envio
        dataType: 'json', // tipo de dato esperado
        cache: false, 
        data: parametroM, // dato que se envia al servidor
        async: false, // hace que la peticion sea sincrona
        success: function(respuestaM) { // si se recibe una respuesta exitosa de parte del servidor se ejecutara esta funcion

            console.log("filas de especialidades: "+respuestaM.filas); // si este numero es mayor al numero de especialidades mostradas quiere decir
                                                            //  que faltaron datos por mostrarse  

            // Respuestas de especialidades                                         
            $('#especialidadR').append('<option value"">Seleccionar</option>') // agrega una opcion por defecto

            $('#especialidadR').append(  // muestra los datos de especialidad
                '<option value="'+
                respuestaM.especialidad +
                '">'+
                respuestaM.especialidad +
                '</option>'
            );
            
           if (respuestaM.especialidad2 != null) { // valida que la variable exista
                $('#especialidadR').append(  // muestra los datos de especialidad
                    '<option value="'+
                    respuestaM.especialidad2 +
                    '">'+
                    respuestaM.especialidad2 +
                    '</option>'
                );  
           }
           if (respuestaM.especialidad3 != null) { // valida que la variable exista
                $('#especialidadR').append(  // muestra los datos de especialidad
                    '<option value="'+
                    respuestaM.especialidad3 +
                    '">'+
                    respuestaM.especialidad3 +
                    '</option>'
                );  
            } // el numero de condicionales es segun el numero maximo de especialidades vista en el acces por medico

            $('#especialidadR').on('change', function() { // esto se ejecutara cuando el estado del selector cambie
                var especialidad = this.value; // recibe valor de la especialidad seleccionada
                $('#agendaR').val(""); // Limpia las opciones anteriores
                $('#sedesR').empty(); // Limpia las opciones anteriores
                $('#tiempoR').empty(); // Limpia las opciones anteriores 
                $('#citasR').empty(); // Limpia las opciones anteriores
                otrosDatos(especialidad, parametroM); // llama la funcion y le envia los valores seleccionados
            });

            function otrosDatos(especialidad, parametroM) {

                var parametroE = {
                    especialidad: especialidad  // se instancia una variable con el valor seleccionado
                };

                var especialidad = parametroE.especialidad; // pasa el parametro a una variable

                var medico = parametroM.medico; // se pasa la llave a una variable

                $.ajax({
                    url: '../php/consulta_externa/doctorDatos2.php',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    data: {especialidad, medico},
                    async: false,
                    success: function(respuestaE){

                        $('#sedesR').empty(); // Limpiar valores anteriores del selector

                        // respuesta de grupo agenda
                        $('#agendaR').val(respuestaE.grupo);

                       // respuesta de sedes
                       $('#sedesR').append(
                           '<option value="'+
                           respuestaE.sede + 
                           '">'+
                           respuestaE.sede +
                           '</option>'
                       );

                       if (respuestaE.sede2 != null) {
                           $('#sedesR').append(
                               '<option value="'+
                               respuestaE.sede2 +
                               '">' +
                               respuestaE.sede2 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.sede3 != null) {
                           $('#sedesR').append(
                               '<option value="'+
                               respuestaE.sede3 +
                               '">' +
                               respuestaE.sede3 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.sede4 != null) {
                           $('#sedesR').append(
                               '<option value="'+
                               respuestaE.sede4 +
                               '">' +
                               respuestaE.sede4 +
                               '</option>'
                           );  
                       } // el numero de condicionales es segun el numero maximo de sedes vista en el acces por medico

                       $('#tiempoR').empty(); // Limpiar valores anteriores del selector
                       // Respuesta de tiempos
                       $('#tiempoR').append(
                           '<option value="">' +
                           respuestaE.tiempo +
                           '</option>'
                       );  

                       if (respuestaE.tiempo2 != null) {
                           $('#tiempoR').append(
                               '<option value="">' +
                               respuestaE.tiempo2 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.tiempo3 != null) {
                           $('#tiempoR').append(
                               '<option value="">' +
                               respuestaE.tiempo3 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.tiempo4 != null) {
                           $('#tiempoR').append(
                               '<option value="">' +
                               respuestaE.tiempo4 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.tiempo5 != null) {
                           $('#tiempoR').append(
                               '<option value="">' +
                               respuestaE.tiempo5 +
                               '</option>'
                           );  
                       }

                       if (respuestaE.tiempo6 != null) {
                           $('#tiempoR').append(
                               '<option value="">' +
                               respuestaE.tiempo6 +
                               '</option>'
                           );  
                       } // el numero de condicionales es segun el numero maximo de tiempos vista en el acces por medico

                       // respuesta de edades
                       $('#edadesR').val(respuestaE.edades);

                       // si el selector de sedes cambia
                       $('#sedesR').on('change', function() {
                            var seleccion = this.value;
                            $('#citasR').empty();
                            if (seleccion == respuestaE.sede) {
                                // respuesta para citas adicionales
                                $('#citasR').append(respuestaE.citas);
                            }

                            if (seleccion == respuestaE.sede2) {
                                // respuesta para citas adicionales
                                $('#citasR').append(respuestaE.citas2);
                            }

                            if (seleccion == respuestaE.sede3) {
                                // respuesta para citas adicionales
                                $('#citasR').append(respuestaE.citas3);
                            }

                            if (seleccion == respuestaE.sede4) {
                                // respuesta para citas adicionales
                                $('#citasR').append(respuestaE.citas4);
                            } // el numero de condicionales es segun el numero maximo de medicos vista en el acces

                            console.log("filas de sedes: "+respuestaE.filasS); // debe ser igual al mumero de sedes vistas
                            console.log("filas de tiempo: "+respuestaE.filasT);
                            console.log("filas de citas: "+respuestaE.filasC);
                       });
                    }
                });
            }
        },
        error: function( jqXHR, textStatus, errorThrown) { // Si el servidor no envia una respuesta se 
                                                        // ejecutara alguna de las siguientes alertas de acuerdo error
                    if (jqXHR.status === 0) {

                    alert('Not connect: Verify Network.');

                    } else if (jqXHR.status == 404) {

                    alert('Requested page not found [404]');

                    } else if (jqXHR.status == 500) {

                    alert('Internal Server Error [500].');

                    } else if (textStatus === 'parsererror') {

                    alert('Error de análisis JSON solicitado.');

                    } else if (textStatus === 'timeout') {

                    alert('Time out error.');

                    } else if (textStatus === 'abort') {

                    alert('Ajax request aborted.');

                    } else {

                    alert('Uncaught Error: ' + jqXHR.responseText);

                    }
                }
    });
 }
