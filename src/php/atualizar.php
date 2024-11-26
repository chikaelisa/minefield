<?php

  include 'bancoDados.php';

  $host = bancoDados::$host;
  $user = bancoDados::$user;
  $password = bancoDados::$password;
  $dbname = bancoDados::$dbname;

  try
  {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $comando = $_POST['comando'];
      
     echo $conn->exec($comando);
  }
  catch (PDOException $ex) 
  {
      echo "Erro na conexão: " . $ex->getMessage();
  }

?>
