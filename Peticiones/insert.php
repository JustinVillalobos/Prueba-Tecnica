<?php

header("Access-Control-Allow-Origin: *");
 require_once("./DBConnect.php");

$producto=json_decode($_POST["Producto"], true);
$name=$producto['name'];
$quantity=$producto["quantity"];
$price=$producto["price"];
$category=$producto["category"];
$image=$producto["image"];



$db=new DBConnect();
$connection=$db->getConnection();

$query = "insert into Product(name,quantity,price,category,image) values('".$name."',".$quantity.",".$price.",'".$category."','".$image."')";
$statement = mysqli_prepare($connection, $query);
 $status =mysqli_stmt_execute($statement);
 mysqli_stmt_close($statement);
 mysqli_close($connection);
echo json_encode(true);




?>