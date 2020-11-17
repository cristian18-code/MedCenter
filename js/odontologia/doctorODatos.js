// Funcion mediante ajax para pasar y recibir parametros con PHP

$('#selectorR').on('change', function() {
    var valor = this.value; // pasa el dato seleccionado a una variable
    $('#agendaR').val(""); // Limpia las opciones anteriores
    $('#edadesR').val(""); // Limpia las opciones anteriores 
    $('#sedesR').empty(); // Limpia las opciones anteriores
    $('#tiempoR').empty(); // Limpia las opciones anteriores 
    $('#observacionR').empty(); // Limpia las opciones anteriores
    realizaProceso(valor); // Envia el dato a una funcion con una peticion ajax
})


function realizaProceso(valor){
  
        var parametroM = {
            medico: valor // recibe el dato del select
        };

    $.ajax({
        url: "../php/odontologia/doctorODatos.php",
        type: 'POST', // metodo de envio
        async: false, // hace que la peticion sea sincrona
        dataType: 'json', // tipo de dato esperado
        cache: false,
        data: parametroM, // dato que se envia al servidor
        success: function (respuestaM) { // si se recibe una respuesta exitosa de parte del servidor se ejecutara esta funcion

            console.log("Filas de especialidad: "+respuestaM.filas); // si este numero es mayor al numero de sedes mostradas quiere decir
                                          //  que faltaron datos por mostrarse  
            // Respuestas de especialidades                                          
            $('#especialidadR').empty(); // Limpia las opciones anteriores del selector

            $('#especialidadR').append('<option value"">Seleccionar</option>') 

            $('#especialidadR').append(  // muestra los datos de especialidad
                '<option value="'+
                respuestaM.especialidad +
                '">'+
                respuestaM.especialidad +
                '</option>'
            );
            
           if (respuestaM.especialidad2 != null) {
                $('#especialidadR').append(  // muestra los datos de especialidad
                    '<option value="'+
                    respuestaM.especialidad2 +
                    '">'+
                    respuestaM.especialidad2 +
                    '</option>'
                );  
           }
           if (respuestaM.especialidad3 != null) {
                $('#especialidadR').append(  // muestra los datos de especialidad
                    '<option value="'+
                    respuestaM.especialidad3 +
                    '">'+
                    respuestaM.especialidad3 +
                    '</option>'
                );  
            }
            $('#especialidadR').on('change', function() {
                var especialidad = this.value;
                $('#agendaR').empty();
                $('#edadesR').empty();
                otrosDatos(especialidad, parametroM);
            });

                function otrosDatos(valor, parametroM) {

                    var parametroE = {
                        valorE: valor
                    }
                    
                    var especialidad = parametroE.valorE;

                    var medico = parametroM.medico;

                    $.ajax({
                        url: '../php/odontologia/doctorODatos2.php',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        cache: false,
                        data: {especialidad, medico},
                        success: function(respuestaE){
                           
                            $('#sedesR').empty(); // Limpiar valores anteriores del selector

                             // respuesta de grupo agenda
                             $('#agendaR').val(respuestaE.grupo);

                            // respuesta de sedes
                            $('#sedesR').append(
                                '<option value="">' +
                                respuestaE.sede +
                                '</option>'
                            );

                            if (respuestaE.sede2 != null) {
                                $('#sedesR').append(
                                    '<option value="">' +
                                    respuestaE.sede2 +
                                    '</option>'
                                );  
                            }

                            if (respuestaE.sede3 != null) {
                                $('#sedesR').append(
                                    '<option value="">' +
                                    respuestaE.sede3 +
                                    '</option>'
                                );  
                            }

                            if (respuestaE.sede4 != null) {
                                $('#sedesR').append(
                                    '<option value="">' +
                                    respuestaE.sede4 +
                                    '</option>'
                                );  
                            }

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
                            }

                            // respuesta de edades
                            $('#edadesR').val(respuestaE.edades);

                            $('#observacionR').empty();
                            // respuesta de observacion                            
                            $('#observacionR').append(respuestaE.observacion);

                            console.log("filas de sedes: "+respuestaE.filasS);
                            console.log("filas de tiempos: "+respuestaE.filasT);

                        },
                        error: function( jqXHR, textStatus, errorThrown) { // Si el servidor no envia una respuesta se 
                            // ejecutara alguna de las siguientes alertas en funcion del error
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
        },
        error: function( jqXHR, textStatus, errorThrown) { // Si el servidor no envia una respuesta se 
            // ejecutara alguna de las siguientes alertas en funcion del error
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
