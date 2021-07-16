<?php

class Product{
	public $idProduct;
	public $name;
	public $quantity;
	public $price;
	public $category;
	public $image;
	public function __construct($idProduct,$name,$quantity,$price,$category,$image){
		$this->idProduct=$idProduct;
		$this->name=$name;
		$this->quantity=$quantity;
		$this->price=$price;
		$this->category=$category;
		$this->image=$image;
	}
}

?>