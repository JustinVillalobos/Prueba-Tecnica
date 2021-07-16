<?php

header("Access-Control-Allow-Origin: *");
 require_once("./DBConnect.php");

	
	
$producto=json_decode($_POST["Producto"], true);
$idProduct=$producto["idProduct"];
$name=$producto['name'];
$quantity=$producto["quantity"];
$price=$producto["price"];
$category=$producto["category"];
$image=$producto["image"];
$db=new DBConnect();
$connection=$db->getConnection();

	$query = "UPDATE Product set name='".$name."',quantity=".$quantity.",price=".$price.",category='".$category."',image='".$image."' where idProduct=".$idProduct;
$statement = mysqli_prepare($connection, $query);
 $status =mysqli_stmt_execute($statement);
 mysqli_stmt_close($statement);
 mysqli_close($connection);
	echo json_encode(true);



?>