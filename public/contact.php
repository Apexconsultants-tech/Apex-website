<?php
declare(strict_types=1);

// Contact form handler for the static-exported Next.js site. Runs on
// HostGator's PHP, using the server's local mail transport (no SMTP
// credentials needed) since there's no Node server at runtime here.
//
// Both the recipient and sender use the same mailbox: using a different,
// unverified "From" address on this domain risks failing SPF/DMARC checks
// at the receiving end and landing in spam. Reply-To is the visitor's own
// address, so replying from the inbox goes straight back to them.
$toEmail = 'info@apexconsultants.org';
$siteName = 'Apex Consulting Services';

header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message, int $status = 200) {
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

// Honeypot: real users never fill this hidden field. Respond as if it
// succeeded so bots don't learn the field is being checked.
if (trim((string) ($_POST['company'] ?? '')) !== '') {
    respond(true, 'Thanks, our team will reach out shortly.');
}

// Single-line fields: strip tags, collapse any newlines (a legitimate name
// or email never contains one — this is also what prevents header
// injection via the Reply-To address below), and trim.
function sanitizeLine(string $value): string {
    $value = strip_tags($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim($value);
}

// The message body is allowed to be multi-line; only strip tags.
function sanitizeText(string $value): string {
    $value = strip_tags($value);
    $value = str_replace("\r\n", "\n", $value);
    return trim($value);
}

$firstName = sanitizeLine((string) ($_POST['first_name'] ?? ''));
$lastName = sanitizeLine((string) ($_POST['last_name'] ?? ''));
$email = sanitizeLine((string) ($_POST['email'] ?? ''));
$mobile = sanitizeLine((string) ($_POST['mobile'] ?? ''));
$destination = sanitizeLine((string) ($_POST['destination'] ?? ''));
$message = sanitizeText((string) ($_POST['message'] ?? ''));
$consent = trim((string) ($_POST['consent'] ?? '')) !== '';

$errors = [];
if ($firstName === '' || mb_strlen($firstName) > 100) {
    $errors[] = 'first name';
}
if ($lastName === '' || mb_strlen($lastName) > 100) {
    $errors[] = 'last name';
}
if ($email === '' || mb_strlen($email) > 255 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email address';
}
$mobileDigits = preg_replace('/\D/', '', $mobile) ?? '';
if ($mobile === '' || mb_strlen($mobile) > 15 || strlen($mobileDigits) < 7) {
    $errors[] = 'mobile number';
}
if ($destination === '') {
    $errors[] = 'destination';
}
$messageLength = mb_strlen($message);
if ($messageLength < 10 || $messageLength > 2000) {
    $errors[] = 'message';
}
if (!$consent) {
    $errors[] = 'consent';
}

if (count($errors) > 0) {
    respond(false, 'Please check the following: ' . implode(', ', $errors) . '.', 422);
}

$fullName = trim("$firstName $lastName");
$submittedAt = (new DateTime('now', new DateTimeZone('Asia/Karachi')))->format('d M Y, H:i');

$subject = "New Website Enquiry - $fullName";

$body = "New website enquiry\n\n"
    . "Name: $fullName\n"
    . "Email: $email\n"
    . "Mobile: $mobile\n"
    . "Preferred destination: $destination\n\n"
    . "Message:\n$message\n\n"
    . "Submitted $submittedAt (PKT) via apexconsultants.org/contact-us\n";

$mailHeaders = [
    "From: $siteName Website <$toEmail>",
    "Reply-To: $email",
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($toEmail, $subject, $body, implode("\r\n", $mailHeaders));

if ($sent) {
    respond(true, 'Thanks, our team will reach out shortly, usually within one business day.');
}

respond(false, "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.", 500);
