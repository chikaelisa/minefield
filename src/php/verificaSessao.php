<?php

  session_start();

  if (!isset($_SESSION['user']))
  {
    header('Location: index.html');
    exit();
  }

  /*$redirectTo = $_GET['pagina'];
  header("Location: {$redirectTo}");
  exit();*/

?>