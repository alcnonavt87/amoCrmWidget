<?php

include 'Dbconfig.php';

class Mysql extends Dbconfig    {

    public $connectionString;
    public $dataSet;
    public $dataGet;
    private $sqlQuery;

    protected $databaseName;
    protected $hostName;
    protected $userName;
    protected $passCode;
    protected $port;

    function __construct()    {
        $this -> connectionString = NULL;
        $this -> sqlQuery = NULL;
        $this -> dataSet = NULL;

        $dbPara = new Dbconfig();
        $this -> databaseName = $dbPara -> dbName;
        $this -> hostName = $dbPara -> serverName;
        $this -> userName = $dbPara -> userName;
        $this -> passCode = $dbPara ->passCode;
        $this -> port = $dbPara ->port;

        $this->connectionString = new \mysqli($this -> serverName, $this -> userName, $this -> passCode, $this -> databaseName, $this -> port);

        if ($this->connectionString->connect_error) {
            throw new \Exception('Error: ' . $this->connectionString->error . '<br />Error No: ' . $this->connectionString->errno);
        }

        $this->connectionString->set_charset("utf8");
        $this->connectionString->query("SET SQL_MODE = ''");
    }

    function dbConnect()    {
        $this->connectionString = new \mysqli($this -> serverName, $this -> userName, $this -> passCode, $this -> databaseName, $this -> port);

        if ($this->connectionString->connect_error) {
            throw new \Exception('Error: ' . $this->connectionString->error . '<br />Error No: ' . $this->connectionString->errno);
        }

        $this->connectionString->set_charset("utf8");
        $this->connectionString->query("SET SQL_MODE = ''");
    }


    function addCardItem($data)  {
        $this->query("INSERT INTO widget SET amoCardId = '" . $this->escape($data['amoCardId']) . "', date = '" . $this->escape($data['date']) . "', price = '" . $this->escape($data['price']) . "'");
        $product_id = $this->getLastId();
        return $product_id;

    }
    function editCardItem($data)  {
        $result = $this->query("UPDATE widget w SET  price = '" . $this->escape($data['price']) . "', date = '" . $this->escape($data['date']) . "' WHERE w.amoCardId = '".$this->escape($data['amoCardId'])."'");
        return $result;

    }
    function getCardItem($amoCardId)  {
        $result = $this->query("SELECT 1 FROM widget w  WHERE w.amoCardId = '".$this->escape($amoCardId)."'");
        return $result->num_rows;

    }
    public function query($sql) {
        $query = $this->connectionString->query($sql);

        if (!$this->connectionString->errno) {
            if ($query instanceof \mysqli_result) {
                $data = array();

                while ($row = $query->fetch_assoc()) {
                    $data[] = $row;
                }

                $result = new \stdClass();
                $result->num_rows = $query->num_rows;
                $result->row = isset($data[0]) ? $data[0] : array();
                $result->rows = $data;

                $query->close();

                return $result;
            } else {
                return true;
            }
        } else {
            echo $this->connectionString->error . ": Error No:" . $this->connectionString->errno . "\n";
        }
    }

    public function getLastId() {
        return $this->connectionString->insert_id;
    }

    public function escape($value) {
        return $this->connectionString->real_escape_string($value);
    }

}
?>