<?php

header("Access-Control-Allow-Origin: *");
 require_once("./DBConnect.php");
require_once("./Product.php");
$idProduct=$_GET["idProduct"];
$db=new DBConnect();
$connection=$db->getConnection();

$query = "delete from Product where idProduct=".$idProduct;
$statement = mysqli_prepare($connection, $query);
 $status =mysqli_stmt_execute($statement);
 mysqli_stmt_close($statement);
 mysqli_close($connection);
echo json_encode($status);



?>