<?php

// Define database connection parameters
$hn      = 'localhost';
$un      = 'root';
$pwd     = '';
$db      = 'gnove';
$cs      = 'utf8';

// Set up the PDO parameters
$dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
$opt 	= array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    PDO::ATTR_EMULATE_PREPARES   => false,
);
// Create a PDO instance (connect to the database)
$pdo 	= new PDO($dsn, $un, $pwd, $opt);
$data    = array();
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);

//Parametros que vem do login
$email     	= filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
$senha      = filter_var($obj->senha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

try {
    
    $sql 	= "SELECT * FROM usuario WHERE email = :email AND senha = :senha";
    $stmt 	=	$pdo->prepare($sql);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_OBJ))
    {
        $data[] = $row;
    }

    if ($data != null)
    {
       // echo "Logado !";
        // Return data as JSON
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } else
    {
        //echo "Usuário ou Senha invalidos";
        $row = "nome: Usuário e senha inválidos";
        $data[] = $row;
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

}
catch(PDOException $e)
{
    echo $e->getMessage();
}

?>