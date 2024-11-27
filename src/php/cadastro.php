<?php

  header('Access-Control-Allow-Origin: *'); 
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); 
  header('Access-Control-Allow-Headers: Content-Type'); 

  include 'bancoDados.php';

  $host = bancoDados::$host;
  $user = bancoDados::$user;
  $password = bancoDados::$password;
  $dbname = bancoDados::$dbname;

  try
  {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {

        $user = $_POST["user"];
        $cpf = $_POST["cpf"];
        $nome = $_POST["nome"];
        $dataNascimento = $_POST["dataNascimento"];
        $telefone = $_POST["telefone"];
        $senha = $_POST["senha"];

        $comando = "INSERT INTO usuario VALUES ('$user', '$cpf', '$nome', '$dataNascimento', 
                                                '$telefone', '$email', '$senha')";

        $resultado = $conn->exec($comando);

        if ($resultado) 
        {
          echo json_encode(['sucesso' => true]);
          exit();
        }

        echo json_encode(['erro' => 'Não foi possível realizar o cadastro.']);
        http_response_code(500);
      }
        
    }

  catch (PDOException $ex) 
  {
      echo "A conexao falhou: " . $ex->getMessage();
  }

?>