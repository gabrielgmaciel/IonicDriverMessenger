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
$pdo 	 =  new PDO($dsn, $un, $pwd, $opt);
$data    =  array();
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$key     =  strip_tags($obj->key);


switch($key){
    
case "altera_dados":

// Attempt to query database table and retrieve data
try {
    $ID	     = filter_var($obj->ID, FILTER_SANITIZE_NUMBER_INT);
    $sql 	= "SELECT * FROM usuario INNER JOIN telefone ON usuario.cod_usuario = telefone.cod_usuario WHERE usuario.cod_usuario = :ID";
    $stmt 	=	$pdo->prepare($sql);
    $stmt->bindParam(':ID', $ID, PDO::PARAM_INT);
    $stmt->execute();
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

break;

case "veiculo":            

    $codigoUsuario    = filter_var($obj->codigoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
    try{
        $query1 = "SELECT * FROM dados_veiculo WHERE cod_usuario = :codigoUsuario";
        $stmt1 	= $pdo->prepare($query1);
        $stmt1->bindParam(':codigoUsuario', $codigoUsuario, PDO::PARAM_STR);
        $stmt1->execute();

        while($row  = $stmt1->fetch(PDO::FETCH_OBJ))
        {
            // Assign each row of data to associative array
            $data[] = $row;
        }
    
        // Return data as JSON
        echo json_encode($data);
    }

    catch(PDOException $e) {
        echo $e->getMessage();
    }
            
break;

case "buscarMensagens":            

    $codigoUsuario    = filter_var($obj->codigoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
    try{
        $query1 = "SELECT * FROM Mensagem_usuario WHERE cod_usuario = :codigoUsuario ORDER BY cod_mensagem_recebida DESC";
        $stmt1 	= $pdo->prepare($query1);
        $stmt1->bindParam(':codigoUsuario', $codigoUsuario, PDO::PARAM_STR);
        $stmt1->execute();

        while($row  = $stmt1->fetch(PDO::FETCH_OBJ))
        {
            // Assign each row of data to associative array
            $data[] = $row;
        }
    
        // Return data as JSON
        echo json_encode($data);
    }

    catch(PDOException $e) {
        echo $e->getMessage();
    }
            
    break;

    case "buscaPlaca":

    $contPlaca = 0;
    $placa 		= filter_var($obj->placa, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    $sql 	= "SELECT cod_usuario FROM dados_veiculo WHERE placa = :placa";
    $validaPlaca 	=	$pdo->prepare($sql);
    $validaPlaca->bindParam(':placa', $placa, PDO::PARAM_STR);
    $validaPlaca->execute();

    while($RetPlaca = $validaPlaca->fetch(PDO::FETCH_OBJ))
    {
        $data[] = $RetPlaca;
        $contPlaca ++;
    // echo "Contador placa->".$contPlaca;
    // echo "\n";
    }
    if ($contPlaca > 0) {
    $row = ["alertPlaca" =>"Placa já cadastrada!"];
    $alertPlaca[] = $row;
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } else {
    $row = ["alertPlaca" =>"Placa não cadastrada!"];
    $alertPlaca[] = $row;
    echo json_encode($alertPlaca, JSON_UNESCAPED_UNICODE);
    }

    break;

    case "busaFrases":

    try {
        $sql 	= "SELECT * FROM mensagem";
        $stmt 	=	$pdo->prepare($sql);
        $stmt->execute();
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

    break;

}

?>