// Funcion mediante ajax para pasar y recibir parametros con PHP

$('#especialidadR').on('change', function() {
    var valorE = this.value;
    $('#sedesR').empty(); // Limpia las opciones anteriores
    $('#tiempoR').empty(); // Limpia las opciones anteriores
    $('#agendaR').empty(); // Limpia las opciones anteriores
    $('#medicosR').empty(); // Limpia las opciones anteriores
    $('#tiempoR').empty(); // Limpia las opciones anteriores 
    $('#edadR').empty(); // Limpia las opciones anteriores
    $('#citasR').empty(); // Limpia las opciones anteriores
    datosSede(valorE); // llama a la funcion y envia el valor seleccionado
});

function datosSede(valorE) {
    
    var parametroE = {
        valorE: valorE // recibe el dato del select
    };

    $.ajax({
        url: "../php/consulta_externa/especialidadDatos.php", // direccion del archivo donde se realizara el backend
        type: 'POST', // metodo de envio
        async: false, // hace que la peticion sea sincrona
        cache: false,
        dataType: 'json', // tipo de dato esperado
        data: parametroE, // dato que se envia al servidor
        success: function(respuestaE) { // si se recibe una respuesta exitosa de parte del servidor se ejecutara esta funcion

            console.log("Filas de sedes: "+respuestaE.filasE) // si este numero es mayor al numero de sedes mostradas quiere decir
                                                                //  que faltaron datos por mostrarse  

            $('#sedesR').empty(); // Limpia las opciones anteriores del selector

            $('#sedesR').append( 
                '<option value"">Seleccionar</option>' // agrega una opcion por defecto
            );
            $('#sedesR').append(
                '<option value="'+
                respuestaE.sede1 +
                '">'+
                respuestaE.sede1 + 
                '</option>'
            );
            if (respuestaE.sede2 != null) { // Valida si hay mas datos en esta opcion
                $('#sedesR').append(
                '<option value="'+
                respuestaE.sede2 +
                '">'+
                respuestaE.sede2 + 
                '</option>'
                );
            }
            if (respuestaE.sede3 != null) { // Valida si hay mas datos en esta opcion
                $('#sedesR').append(
                '<option value="'+
                respuestaE.sede3 +
                '">'+
                respuestaE.sede3 + 
                '</option>'
                );
            }
            if (respuestaE.sede4 != null) { // Valida si hay mas datos en esta opcion
                $('#sedesR').append(
                '<option value="'+
                respuestaE.sede4 +
                '">'+
                respuestaE.sede4 + 
                '</option>'
                );
            }
            if (respuestaE.sede5 != null) { // Valida si hay mas datos en esta opcion
                $('#sedesR').append(
                '<option value="'+
                respuestaE.sede5 +
                '">'+
                respuestaE.sede5 + 
                '</option>'
                );
            }
            if (respuestaE.sede6 != null) { // Valida si hay mas datos en esta opcion
                $('#sedesR').append(
                '<option value="'+
                respuestaE.sede6 +
                '">'+
                respuestaE.sede6 + 
                '</option>'
                );
            } // el numero de condicionales es segun el numero maximo de sedes vista en el acces por medico

            // respuesta de grupo agenda
            $('#agendaR').val(respuestaE.agenda); // cambia el valor del elemento

            // respuesta de edades
            $('#edadR').val(respuestaE.edades); // cambia el valor del elemento

            $('#sedesR').on('change', function() {
                var valorS = this.value;
                datosMedico(valorS, parametroE);
            });
            function datosMedico(valorS, parametroE) {

                var parametroS = {
                    sede: valorS
                }
                var sede = parametroS.sede;

                var especialidad = parametroE.valorE;
            
                $.ajax({ 
                    url: "../php/consulta_externa/especialidadDatos2.php",
                    type: 'POST',
                    cache: false,
                    async: false,
                    dataType: 'json',
                    data: {sede, especialidad},
                    success: function (respuestaS) {
                        $('#medicosR').empty(); // Limpia las opciones anteriores del selector
                        
                        $('#medicosR').append( // muestra una opcion predeterminada
                            '<option value"">Seleccionar</option>'
                        );
                        // Muestra el primer dato de medicos
                        $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos1 +
                            '">'+
                            respuestaS.Medicos1 + 
                            '</option>'
                        );
                        
                        if (respuestaS.Medicos2 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos2 +
                            '">'+
                            respuestaS.Medicos2 + 
                            '</option>'
                            );
                        }
                        if (respuestaS.Medicos3 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos3 +
                            '">'+
                            respuestaS.Medicos3 + 
                            '</option>'
                            );
                        }
                        if (respuestaS.Medicos4 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos4 +
                            '">'+
                            respuestaS.Medicos4 + 
                            '</option>'
                            );
                        }
                        if (respuestaS.Medicos5 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos5 +
                            '">'+
                            respuestaS.Medicos5 + 
                            '</option>'
                            );

                        }
                        if (respuestaS.Medicos6 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos6 +
                            '">'+
                            respuestaS.Medicos6 + 
                            '</option>'
                            );
                        }
                       
                        if (respuestaS.Medicos7 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos7 +
                            '">'+
                            respuestaS.Medicos7 + 
                            '</option>'
                            );
                        }
                        if (respuestaS.Medicos8 != null) { // Valida si hay mas datos en esta opcion
                            $('#medicosR').append(
                            '<option value="'+
                            respuestaS.Medicos8 +
                            '">'+
                            respuestaS.Medicos8 + 
                            '</option>'
                            );
                        } // el numero de condicionales es segun el numero maximo de medicos vista en el acces por especialidad

                        $('#medicosR').on('change', function() {
                            var seleccion = this.value;
                            $('#tiempoR').empty(); // Limpia las opciones anteriores
                            $('#citasR').empty(); // Limpia las opciones anteriores
                            
                            if (seleccion == respuestaS.Medicos1) {
                                
                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo1 +
                                    '">'+
                                    respuestaS.tiempo1 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas1);                                
                            }
                            
                            if (seleccion == respuestaS.Medicos2) {  
                                
                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo2 +
                                    '">'+
                                    respuestaS.tiempo2 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas2);
                            }

                            if (seleccion == respuestaS.Medicos3) {
                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo3 +
                                    '">'+
                                    respuestaS.tiempo3 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas3);
                            }

                            if (seleccion == respuestaS.Medicos4) {
                                
                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo4 +
                                    '">'+
                                    respuestaS.tiempo4 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas4);
                            }

                            if (seleccion == respuestaS.Medicos5) {
                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo5 +
                                    '">'+
                                    respuestaS.tiempo5 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas5);
                            }

                            if (seleccion == respuestaS.Medicos6) {

                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo6 +
                                    '">'+
                                    respuestaS.tiempo6 + 
                                    '</option>'
                                );

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas6);
                            }

                            if (seleccion == respuestaS.Medicos7) {

                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo7 +
                                    '">'+
                                    respuestaS.tiempo7 + 
                                    '</option>'
                                ); 

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas7);
                            }

                            if (seleccion == respuestaS.Medicos8) {

                                // Muestra el dato de tiempo
                                $('#tiempoR').append(
                                    '<option value="'+
                                    respuestaS.tiempo8 +
                                    '">'+
                                    respuestaS.tiempo8 + 
                                    '</option>'
                                ); 

                                // Muestra dato de citas adicionales
                                $('#citasR').append(respuestaS.citas7);
                            }

                            console.log("filas de citas, medicos y tiempos: "+respuestaS.filasD)
                            console.log("filas de edades: "+respuestaE.filaE)
                        });
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