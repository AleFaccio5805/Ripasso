<?php

    $json = file_get_contents("php://input");

    $data = date("Y-m-d");

    //Creo File con le risposte dentro
    $fp = fopen("../Files/".$data."risposte.json", "w");
    fwrite($fp, $json);
    fclose($fp);
    
    //Definisco la risposta
    $risp = new stdClass();
    $risp->cod = 0;
    $risp->desc = "Salvataggio dei dati su file avvenuto con successo";

    echo json_encode($risp);

?>
