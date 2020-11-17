<?php
    require '../php/conexion.php';
    
    header("Content-Type: text/html; charset=UTF-8");

    // Ver datos de doctor la palabra DISTINCT sirve para seleccionar los datos sin repetirse y guarda la consulta en una variable
    $consultaEsp = "SELECT DISTINCT Especialidad
                                    FROM especialidades WHERE Tipo = 'Consulta Externa' ORDER BY especialidades.Especialidad ASC";
    $ejecutarEsp = mysqli_query($conectar, $consultaEsp); /* Ejecuta la consulta y la guarda en una variable para ser usada despues*/
    mysqli_close($conectar); // cierra la conexion con la base de datos
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Styles/consulta_externa/especialidad.css">
    <link rel="shortcut icon" href="../Images/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="../Styles/bootstrap.min.css"> <!-- Libreria para usar estilos de Bootstrap -->
    <script src="../Js/jquery-3.5.1.min.js"></script> <!--   Libreria para usar jquery -->
    <link href="../Select2_plugin/css/select2.min.css" rel="stylesheet" /> <!--   Libreria para usar buscador del selector -->
    <script src="../Select2_plugin/js/select2.min.js"></script>    <!--   Libreria para usar buscador del selector -->
    <title>Medcenter</title>
</head>
<body>

    <header id="cabecera">
            <span class="titulo">
                <h1>Consulta Externa</h1>
            </span>
            <a href="../Index.html"><img src="../Images/casa.png" alt="Home" width="70px"></a>
    </header>
    <section>
        <center><img src="../Images/doctor.png" alt="Consulta externa" width="80px" id="doctor"></center>
        <form >
            <label>Especialidad</label>
            <div id="especialidad"> <!-- Div para seleccionar y buscar medicos -->
                <select name="especialidadR" id="especialidadR" size="3" autofocus>
                    <!-- Trae los datos que estan en la base de datos -->
                    <optgroup>
                        <?php foreach ($ejecutarEsp as $dato) {?>
                            
                            <option value="<?php echo $dato['Especialidad'];?>"><?php echo $dato['Especialidad'];?></option>

                        <?php } ?>
                    </optgroup>
                </select>
                <script type="text/javascript"> // Script para funcion de buscar en el selector
                    $('select').select2();

                    $('#especialidadR').select2({/* Placeholder*/
                        placeholder: "Buscar",
                    });
                </script>
            </div>
            <div id="datos">
                <div id="agenda">
                    <label for="agendaR">Grupo Agenda</label>
                    <input type="text" name="agendaR" id="agendaR" value="" readonly>
                </div>
                <label for="sedesR">Sede</label>
                <div id="sedes">
                    <select name="sedesR" id="sedesR">
                        <option value="">Seleccionar</option>
                    </select>
                </div>
                <label for="medicosR">Medicos</label>
                <div id="medicos">
                    <select name="medicosR" id="medicosR">
                        <option value="">Seleccionar</option>
                    </select>
                    <script type="text/javascript"> // Script para funcion de buscar en el selector
                        $('select').select2();
                </script>
                </div>
                <div id="tiempoEdad">
                    <label for="tiempoR">Tiempo Agenda</label>
                    <select name="tiempoR" id="tiempoR" size="2 ">

                    </select>
                    <label for="edadR">Edad</label>
                    <div id="edad"><input type="text" name="edadR" id="edadR" value="" readonly></div>
                </div>
                <div id="citas">
                    <label for="citasR">Citas Adicionales </label>
                    <textarea name="citasR" id="citasR" cols="70" rows="5" style="resize: none;" readonly></textarea>
                </div>
            </div>
        </form>
    </section>    

    <footer>
        <span class="empresa">MedContactCenter</span>
    </footer>        
</body>
<script src="../Js/consulta_externa/especialidadDatos.js"></script>
</html>