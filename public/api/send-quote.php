<?php
// Simple email relay for ClixSys forms using Resend API
// Place this file at public_html/api/send-quote.php on Hostinger

// CORS (adjust origin to your domain for production)
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
}

// Basic rate limit by IP (30s)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateKey = sys_get_temp_dir() . '/clix_rate_' . md5($ip);
if (file_exists($rateKey) && (time() - filemtime($rateKey) < 30)) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'Too many requests. Please wait a moment.']);
  exit;
}
@touch($rateKey);

// Read JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON body']);
  exit;
}

function val($arr, $key, $default = '') {
  return isset($arr[$key]) ? trim((string)$arr[$key]) : $default;
}

$formType = val($data, 'formType', 'Website Form');
$name = val($data, 'name');
$email = val($data, 'email');
$phone = val($data, 'phone');
$country = val($data, 'country');
$city = val($data, 'city');
$productInterest = val($data, 'productInterest');
$additionalInfo = val($data, 'additionalInfo');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Valid email is required']);
  exit;
}

// Build a neat HTML body
function safe($s) { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

$lines = [];
foreach ($data as $k => $v) {
  if ($k === '_subject') continue;
  $lines[] = '<tr><td style="padding:6px 10px;border:1px solid #eee;font-weight:600;">' . safe($k) . '</td>' .
             '<td style="padding:6px 10px;border:1px solid #eee;">' . safe(is_string($v) ? $v : json_encode($v)) . '</td></tr>';
}
$htmlTable = '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:700px;font-family:Arial,Helvetica,sans-serif;font-size:14px">' .
             implode('', $lines) . '</table>';

$subject = val($data, '_subject', $formType . ' Submission');

// Optional local secrets file (fallback when env vars are unavailable)
$configPath = __DIR__ . '/../config/secret.php';
if (file_exists($configPath)) { @include $configPath; }

// Choose provider: SendGrid preferred (works with Single Sender), fallback to Resend
$sendgridKey = getenv('SENDGRID_API_KEY') ?: (defined('SENDGRID_API_KEY') ? SENDGRID_API_KEY : null);
$resendKey   = getenv('RESEND_API_KEY')   ?: (defined('RESEND_API_KEY')   ? RESEND_API_KEY   : null);

// Recipient and sender
$toEmail = 'info@clixsys.com';
$senderEmail = getenv('SENDER_EMAIL') ?: (defined('SENDER_EMAIL') ? SENDER_EMAIL : 'info@clixsys.com'); // verified/single sender
$senderName  = getenv('SENDER_NAME') ?: (defined('SENDER_NAME') ? SENDER_NAME : 'ClixSys Website');

// Render HTML body
$htmlBody = '<div style="font-family:Arial,Helvetica,sans-serif">'
  . '<h2 style="margin:0 0 10px">' . safe($formType) . '</h2>'
  . '<p style="margin:0 0 16px;color:#444">New submission from clixsys.com</p>'
  . $htmlTable
  . '</div>';

if ($sendgridKey) {
  $sgPayload = [
    'personalizations' => [[ 'to' => [[ 'email' => $toEmail ]] ]],
    'from' => [ 'email' => $senderEmail, 'name' => $senderName ],
    'subject' => $subject,
    'content' => [
      [ 'type' => 'text/plain', 'value' => strip_tags($formType) . "\n\n" . strip_tags($htmlTable) ],
      [ 'type' => 'text/html', 'value' => $htmlBody ]
    ]
  ];
  $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $sendgridKey,
    'Content-Type: application/json'
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sgPayload));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $resp = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);

  if ($resp === false || $http >= 300) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'SendGrid send failed', 'details' => $resp ?: $err, 'status' => $http]);
    exit;
  }
  echo json_encode(['ok' => true, 'provider' => 'sendgrid']);
  exit;
}

if ($resendKey) {
  // Resend (requires domain or from address verification)
  $fromHeader = $senderName . ' <' . $senderEmail . '>';
  $payload = [
    'from' => $fromHeader,
    'to' => [$toEmail],
    'subject' => $subject,
    'html' => $htmlBody
  ];
  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendKey,
    'Content-Type: application/json'
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $resp = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);

  if ($resp === false || $http >= 300) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Resend send failed', 'details' => $resp ?: $err, 'status' => $http]);
    exit;
  }
  echo json_encode(['ok' => true, 'provider' => 'resend']);
  exit;
}

http_response_code(500);
echo json_encode(['ok' => false, 'error' => 'No email provider configured. Set SENDGRID_API_KEY or RESEND_API_KEY.']);
?>


