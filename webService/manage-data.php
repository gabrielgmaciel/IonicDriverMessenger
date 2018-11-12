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

   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);
   $contEmail  = 0;
   $contPlaca  = 0;

   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the technologies table
      case "insert":
      // Sanitise URL supplied values
         $nome 		    = filter_var($obj->nome, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $email     	= filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $telefone      = filter_var($obj->telefone, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $senha         = filter_var($obj->senha1, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $tipoVeiculo   = filter_var($obj->tipoVeiculo, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $placa         = filter_var($obj->placa, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $modelo        = filter_var($obj->modelo, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        // Attempt to run PDO prepared statement
        try {
            
            /* Validação de E-mail e Placa, para o usuario não cadastrar */
            $sql 	= "SELECT * FROM usuario WHERE email = :email";
            $validaEmail 	=	$pdo->prepare($sql);
            $validaEmail->bindParam(':email', $email, PDO::PARAM_STR);
            $validaEmail->execute();
        
            while($RetEmail = $validaEmail->fetch(PDO::FETCH_OBJ))
            {
                $data[] = $RetEmail;
                $contEmail ++;
                //echo "Contador email->".$contEmail;
               // echo "\n";
            }
            
            $sql 	= "SELECT * FROM dados_veiculo WHERE placa = :placa";
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
            
            if ($contEmail > 0)
            {
                $row = ["alertEmail" =>"E-mail já cadastrado!"];
                $alertEmail[] = $row;
                echo json_encode($alertEmail, JSON_UNESCAPED_UNICODE);
            } elseif ($contPlaca > 0) {
                $row = ["alertPlaca" =>"Placa já cadastrada!"];
                $alertPlaca[] = $row;
                echo json_encode($alertPlaca, JSON_UNESCAPED_UNICODE);
            } else {
                //Cadastro ok!
                $query1	= "INSERT INTO usuario(nome, email, senha) VALUES (:nome, :email, :senha)";
                $query2 = "INSERT INTO dados_veiculo(cod_usuario, placa, modelo, tipo_veiculo) VALUES((select last_insert_id()), :placa, :modelo, :tipoVeiculo)";
                $query3 = "INSERT INTO telefone(cod_usuario,telefone ) VALUES ((select last_insert_id()), :telefone)"; 
                $stmt1 	= $pdo->prepare($query1);
                $stmt2  = $pdo->prepare($query2);
                $stmt3  = $pdo->prepare($query3);
                $stmt1->bindParam(':nome', $nome, PDO::PARAM_STR);
                $stmt1->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt3->bindParam(':telefone', $telefone, PDO::PARAM_STR);
                $stmt1->bindParam(':senha', $senha, PDO::PARAM_STR);
                $stmt2->bindParam(':tipoVeiculo', $tipoVeiculo, PDO::PARAM_STR);
                $stmt2->bindParam(':placa', $placa, PDO::PARAM_STR);
                $stmt2->bindParam(':modelo', $modelo, PDO::PARAM_STR);
                $stmt1->execute();
                $stmt2->execute();
                $stmt3->execute();
                //echo "Cadastro realiado!";
                $row = ["alertPlaca" =>"0"];
                $alertEmail[] = $row;
                echo json_encode($alertEmail);
                //echo json_encode(array('message' => 'Congratulations the record ' . $nome . ' was added to the database', 'alertEmail' => '0'));
            }

         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;


      case "veiculo":
            $sql   = "SELECT * FROM dados_veiculo WHERE placa = :placa";
            $validaPlaca   =  $pdo->prepare($sql);
            $validaPlaca->bindParam(':placa', $placa, PDO::PARAM_STR);
            $validaPlaca->execute();
        
            while($RetPlaca = $validaPlaca->fetch(PDO::FETCH_OBJ))
            {
                $data[] = $RetPlaca;
                $contPlaca ++;
            }
            
            if($contPlaca > 0){
                $row = ["alertPlaca" => "Placa já cadastrada!"];
                echo json_encode(array('message' => 'Placa já cadastrada!!'));
            } else {
                $placa 		   = filter_var($obj->placa, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $modelo     	   = filter_var($obj->modelo, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $tipo             = filter_var($obj->tipo, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $codigoUsuario    = filter_var($obj->codigoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                try{
                    $query1 = "INSERT Dados_veiculo (cod_usuario, tipo_veiculo, placa, modelo) VALUES (:codigoUsuario, :tipo, :placa, :modelo);";
                    $stmt1 	= $pdo->prepare($query1);
                    $stmt1->bindParam(':codigoUsuario', $codigoUsuario, PDO::PARAM_STR);
                    $stmt1->bindParam(':tipo',          $tipo, PDO::PARAM_STR);
                    $stmt1->bindParam(':placa',         $placa, PDO::PARAM_STR);
                    $stmt1->bindParam(':modelo',        $modelo, PDO::PARAM_STR);
                    $stmt1->execute();
                    echo json_encode(array('message' => 'Veículo cadastrado!'));
                }
                catch(PDOException $e) {
                    echo json_encode(array('message' => 'Placa já cadastrada!!'));
                }
            }
      break;

      case "excluirVeiculo":

        $placa = filter_var($obj->placa, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            try{
                $query1 = "DELETE FROM Dados_veiculo WHERE placa = :placa";
                $stmt1 	= $pdo->prepare($query1);
                $stmt1->bindParam(':placa',         $placa, PDO::PARAM_STR);
                $stmt1->execute();
                echo json_encode(array('message' => 'Veículo deletado'));
            }
            catch(PDOException $e) {
                echo json_encode(array('message' => 'Erro!!'));
            }
        
      break;

      // Update an existing record in the technologies table
      case "update":

         // Sanitise URL supplied values
         $nome 		    = filter_var($obj->nome, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         //$email     	= filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $telefone      = filter_var($obj->telefone, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $senha         = filter_var($obj->senha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $ID	        = filter_var($obj->ID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE usuario SET nome = :nome, senha = :senha WHERE cod_usuario = :ID";
            $sql2   = "UPDATE telefone SET telefone = :telefone WHERE cod_usuario = :ID";
            $stmt 	=	$pdo->prepare($sql);
            $stmt2  =   $pdo->prepare($sql2);
            $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
            //$stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt2->bindParam(':telefone', $telefone, PDO::PARAM_STR);
            $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
            $stmt->bindParam(':ID', $ID, PDO::PARAM_INT);
            $stmt2->bindParam(':ID', $ID, PDO::PARAM_INT);
            $stmt->execute();
            $stmt2->execute();

            echo json_encode('Congratulations the record ' . $nome . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      case "excluirConta":

        $codigoUsuario = filter_var($obj->codigoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            try{
                $query1 = "DELETE FROM Usuario WHERE cod_usuario = :codigoUsuario";
                $stmt1 	= $pdo->prepare($query1);
                $stmt1->bindParam(':codigoUsuario', $codigoUsuario, PDO::PARAM_STR);
                $stmt1->execute();
                echo json_encode(array('message' => 'Conta Excluída com sucesso!'));
            }
            catch(PDOException $e) {
                echo json_encode(array('message' => 'Erro ao excluir conta!!'));
            }
        
      break;

      // Remove an existing record in the technologies table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $recordID	=	filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "DELETE FROM technologies WHERE id = :recordID";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      case 'placa':
      $nome 		    = filter_var($obj->nome, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
      $email     	= filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

      $sql 	= "SELECT * FROM dados_veiculo WHERE placa = :placa";
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
        echo json_encode($alertPlaca, JSON_UNESCAPED_UNICODE);
      }

      break;
   }

?>