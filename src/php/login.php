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
        $senhaEnviada = $_POST['senha'];
        $usuarioEnviado = $_POST['username'];
     
        $comando = "SELECT senha FROM usuario WHERE username = '$usuarioEnviado'";

        $stmt = $conn->query($comando);
        $senha = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$senha)
        {
          echo json_encode(['erro' => 'Usuário ou senha incorretos.']);
          http_response_code(400);
          exit();
        }

        if ($senha['senha'] == $senhaEnviada)
        {
          echo json_encode(['sucesso' => true]);
          exit();
        }
            
        echo json_encode(['erro' => 'Usuário ou senha incorretos.']);
        
    }
  }
  catch (PDOException $ex) 
  {
      echo "A conexao falhou: " . $ex->getMessage();
  }

?>