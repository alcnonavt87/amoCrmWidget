<?php
require_once('db/mysql.php');
if ($_POST) {
    $dataCart = $_POST['data'];

    $error = [];
    $response = [];

    if (!((isset($dataCart['date']) && strtotime($dataCart['date'])))) {
        $error[] = 'Неверный формат даты';
    }

    if (!preg_match("/^[0-9]+(\.[0-9]{2})?$/", $dataCart['price'])) {
        $error[] = 'Неверный формат цены';
    }
    if (!$error) {
        $sql = new Mysql;
        $cardItem = $sql->getCardItem($dataCart['amoCardId']);
        if (!$cardItem) {
            $products = $sql->addCardItem($dataCart);
        } else {
            $products = $sql->editCardItem($dataCart);
        }

        if ($products) {
            $response['success'] = 'Данные успешно сохнанены';
        }
    } else {
        $response['error'] = $error;
    }
    $response = json_encode($response);
    echo $response;
} else {
    header("HTTP/1.0 401 Unauthorized");
}
?>