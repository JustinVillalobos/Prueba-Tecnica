<?php

header("Access-Control-Allow-Origin: *");
 require_once("./DBConnect.php");
require_once("./Product.php");
$idProduct=$_GET["idProduct"];
$db=new DBConnect();
$connection=$db->getConnection();
$product;
$query = "select * from Product where idProduct=".$idProduct;
 $statement = mysqli_prepare($connection, $query);
mysqli_stmt_execute($statement);
 mysqli_stmt_bind_result($statement,$id, $name,$quantity,$price,$category,$image);
 if(mysqli_stmt_fetch($statement)) {
    $product=new Product($idProduct,$name,$quantity,$price,$category,$image);
}
mysqli_stmt_close($statement);
 mysqli_close($connection);
echo json_encode($product);




?>