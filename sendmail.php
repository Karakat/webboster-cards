<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail-> CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('cards@test.com', 'Обувной магазин');
    $mail->addAddress('KarakatDev@yandex.ru');
    $mail->Subject = 'Информация о заказе';

    $body = '<h2>Детали вашего заказа</h2>';
    
    if(trim(!empty($_POST['buyer']))){
        $body.='<span>Имя покупателя: '.$_POST['buyer'].'</span>';
    }
    if(trim(!empty($_POST['phonenumber']))){
        $body.='<span>Номер для связи: '.$_POST['phonenumber'].'</span>';
    }

    $mail->Body = $body;

    if(!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Заказ отправлен';
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
