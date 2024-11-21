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
    $comando = $_GET['comando'];
    $stmt = $conn->query($comando);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }
  catch (PDOException $ex) 
  {
      echo "Connection failed: " . $ex->getMessage();
  }

?>