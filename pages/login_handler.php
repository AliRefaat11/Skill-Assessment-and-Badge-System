<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Trivial demo auth: accept any email/password, set session, redirect
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if ($email === '' || !preg_match('/^[A-Za-z][^@\s]*@[A-Za-z][^\s@]*$/', $email)) {
  header('Location: auth.php?tab=login');
  exit;
}
// Password must be >=8 chars and contain letters and numbers
if ($password === '') {
  header('Location: auth.php?tab=login&error=pw');
  exit;
}
if (strlen($password) < 8) {
  header('Location: auth.php?tab=login&error=pw');
  exit;
}
if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
  header('Location: auth.php?tab=login&error=pw');
  exit;
}

$_SESSION['user'] = [
  'email' => $email,
];
header('Location: profile.php');
exit;