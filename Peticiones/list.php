<?php

header("Access-Control-Allow-Origin: *");
require_once("./DBConnect.php");
require_once("./Product.php");
$db=new DBConnect();
$connection=$db->getConnection();
$products = array();
$query = "select * from Product order by idProduct desc";
$result = mysqli_query($connection, $query);
if(!$result){
      echo "No se ha podido realizar la consulta";
 }else {
    while ($colum = mysqli_fetch_array($result)) {
        $product = new Product($colum['idProduct'],
        $colum['name'],
        $colum['quantity'],
        $colum['price'],
        $colum['category'],
        $colum['image']);

        $products[] = $product;
   }
}
mysqli_close($connection);
echo json_encode($products);

 




?>