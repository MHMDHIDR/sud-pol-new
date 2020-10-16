<?php
  // Only process POST reqeusts.
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Set a 400 (bad request) response code and exit.
      http_response_code(400);
      echo "عفوًا! يبدو أنه يوجد خطأ ما.";
      exit;
    }

    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "elmogiera@yahoo.com";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Headers, [ .=  means concatenation to the previous header varibale ]
    $headers  = 'From:' . $name. "\r\n" . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=utf-8\n";

    // Build the email headers.
    //$email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
      // Set a 200 (okay) response code.
      http_response_code(200);
      echo "شكرًا! تم إرسال رسالتك بنجاح.";
    } else {
      // Set a 500 (internal server error) response code.
      http_response_code(500);
      echo "عفوًا! يبدو أنه يوجد خطأ ما.";
    }

  } else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "عفوًا! حدث خطأ أثناء الإرسال، حاول مرة أخرى.";
  }