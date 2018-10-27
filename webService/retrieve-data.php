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
$key     =  strip_tags($obj->key);


switch($key){
    
    case "":

        $codigoUsuario    = filter_var($obj->codigoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $stmt 	= $pdo->query('SELECT * FROM Dados_veiculo WHERE cod_usuario =');
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {
            // Assign each row of data to associative array
            $data[] = $row;
        }

        // Return data as JSON
        echo json_encode($data);

    break;
}

// Attempt to query database table and retrieve data
try {
    $stmt 	= $pdo->query('SELECT * FROM usuario ORDER BY nome ASC');
    while($row  = $stmt->fetch(PDO::FETCH_OBJ))
    {
        // Assign each row of data to associative array
        $data[] = $row;
    }

    // Return data as JSON
    echo json_encode($data);
}
catch(PDOException $e)
{
    echo $e->getMessage();
}


?>