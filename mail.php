<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// переменные из нашей формы
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
// $address = $_POST['user_address'];
// $city = $_POST['user_city'];
// $country = $_POST['user_country'];
// $order = $_POST['user_order'];
// $receive = $_POST['user_receive'];
// $qty = $_POST['user_qty'];
// $price = $_POST['user_price'];
// $desc = $_POST['user_desc'];
// $phone = $_POST['user_phone'];
// $email = $_POST['user_email'];

// настройка почтового ящика
$mail->isSMTP();                                // Настраиваем почту для SMTP
$mail->Host = 'smtp.ukr.net';  															// Основкой SMTP сервер
$mail->SMTPAuth = true;                         // Включить аутентификацию SMTP
$mail->Username = 'stepacademy1999@ukr.net';    // логин от почты с которой будут отправляться письма
$mail->Password = 'Q2cCyYpU6wv970jX';            // пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                      // Включить шифрование ssl
$mail->Port = 465;                                 // TCP порт для подключения / этот порт может отличаться у других провайдеров

$mail->setFrom('stepacademy1999@ukr.net');      // от кого будет уходить письмо для пользователя
$mail->addAddress('shidenkoser@gmail.com');                          // Кому будет приходить заявка
//$mail->addAddress('ellen@example.com');               // Имя не обязательно
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
$mail->isHTML(true);                                  // Установить формат электронной почты в HTML

$mail->Subject = 'new order for Sergiy';
$mail->Body    = '' . $name . 'leav order, cellphone' . '<br>'. $phone. '<br> mail:' . $email;
// $mail->Body    = '' . $address . '<br>' . $city . '<br>' . $order . '<br>' . $receive . '<br>' . $qty . '<br>' . $price . '<br>' .  $desc . '<br>' . $phone . $phone. '<br>mail:' . $email; 
$mail->AltBody = '';

if(!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    header('location: thank-you.html');
}
?>
