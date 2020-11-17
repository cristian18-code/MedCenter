<?php
    require '../php/conexion.php'; // En este archivo se hace la conexion por lo cual es indispensable
    
    header("Content-Type: text/html; charset=UTF-8");

    // Ver datos de doctor la palabra DISTINCT sirve para seleccionar los datos sin repetirse, lo guardamos en una variable
    $consultaMed = "SELECT DISTINCT Medicos
                                    FROM especialidades WHERE Tipo = 'Consulta Externa' ORDER BY especialidades.Medicos ASC";
    $ejecutarMed = mysqli_query($conectar, $consultaMed); // ejecuta la consulta y la guarda en una base de datos para usarla despues
    mysqli_close($conectar); // cerramos la conexion con la base de datos
?>  

<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Styles/consulta_externa/doctor.css">
    <link rel="shortcut icon" href="../Images/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="../Styles/bootstrap.min.css"> <!-- Libreria para usar estilos de Bootstrap -->
    <script src="../Js/jquery-3.5.1.min.js"></script> <!--   Libreria para usar jquery -->
    <link href="../Select2_plugin/css/select2.min.css" rel="stylesheet" /> <!--   Libreria para usar buscador del selector -->
    <script src="../Select2_plugin/js/select2.min.js"></script>     <!-- Libreria para usar buscador del selector -->
    <title>Medcenter</title>
</head>
<body>

        <header id="cabecera"> <!-- Cabecera-->
            <span class="titulo">
                <h1>Consulta Externa</h1>
            </span>
            <a href="../Index.html"><img src="../Images/casa.png" alt="Home" width="70px"></a> <!-- redireccionamiento hacia el index -->
        </header>
        <section > <!-- Contiene el funcionamiento del acces como tal-->
            <center><img src="../Images/doctor.png" alt="Consulta externa" width="80px"></center> <!-- Imagen sin ninguna funcion-->
            <form action=""> <!-- formulario-->
                <label for="selectorR" >Busqueda Medico</label>
                <div id="selector"> <!-- Div para seleccionar y buscar medicos -->
                    <select name="selectorR" id="selectorR">
                        <optgroup>
                            <option value=""></option>
                            <?php foreach ($ejecutarMed as $dato) {?> <!-- Trae los datos que estan en la base de datos -->
                                <!-- Bucle que recorre cada fila de la consulta-->
                                <option value="<?php echo $dato['Medicos'];?>"><?php echo $dato['Medicos'];?></option>

                            <?php } ?>
                        </optgroup>
                    </select>
                    <script type="text/javascript"> // Script para funcion de buscar en el selector
                            $('selector').select2();

                            $('#selectorR').select2({/* Placeholder*/
                                placeholder: "Buscar Doctor",
                            });
                    </script>
                </div>
                <div id="datos">
                    <div id="especialidad"><label for="especialidadR">Especialidad </label>
                    <select class="browser-default custom-select" name="especialidadR" id="especialidadR" >
                        
                    </select>
                    <div id="agenda">
                        <label for="agendaR">Grupo Agenda </label>
                        <input type="text" name="agendaR" id="agendaR" value="" readonly>
                    </div>
                    <div id="sedesTiempo">
                        <label for="sedesR">Sede </label>
                        <select name="sedesR" id="sedesR" size="3" >
                        </select>

                        <label for="tiempoR">Tiempo </label>
                        <select name="tiempoR" id="tiempoR" size="3" style="overflow: hidden;"></select>
                    </div>
                    <div id="edades">
                        <label for="edadesR">Edades </label>
                        <input type="text" name="edadesR" id="edadesR" value="" readonly>
                    </div>
                    <div id="citas">
                        <label for="citasR">Citas Adicionales </label>
                        <textarea name="citasR" id="citasR" cols="80" rows="5" style="resize: none;" readonly></textarea>
                    </div>
                </div>
            </form>    
        </section>
        <footer>
            <span class="empresa">MedContactCenter</span>
        </footer>
</body>
<script src="../Js/consulta_externa/doctorDatos.js"></script>
</html>