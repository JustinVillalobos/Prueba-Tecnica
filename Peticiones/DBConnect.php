<?php
define ("DB_SERVER", "localhost");
  define ("DB_USERNAME", "id11989583_justin_ladonware");
  define ("DB_PASSWORD", "0t(%sdIC5Z[yyb!4");
  define ("DB_DATABASE", "id11989583_ladonware");

class DBConnect{
  public function __construct() {}

        public function getConnection() {

          global $connection;

            $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
            if(!$connection) {
                echo("ERROR AL CONECTAR A BASE DE DATOS");
            }
            return $connection;
        }
}

?>
