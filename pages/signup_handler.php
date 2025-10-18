<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Trivial demo signup: set session and redirect
$first = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$last = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
$email = isset($_POST['email2']) ? trim($_POST['email2']) : '';
$password = isset($_POST['password2']) ? trim($_POST['password2']) : '';
$skill = isset($_POST['skill']) ? trim($_POST['skill']) : '';

// Basic validations
if ($first === '' || $last === '') {
  header('Location: auth.php?tab=signup');
  exit;
}
// Email with letters before/after @
if ($email === '' || !preg_match('/^[A-Za-z][^@\s]*@[A-Za-z][^\s@]*$/', $email)) {
  header('Location: auth.php?tab=signup');
  exit;
}
// Password >=8 chars and must contain letters and numbers
if ($password === '') {
  header('Location: auth.php?tab=signup&error=pw');
  exit;
}
if (strlen($password) < 8) {
  header('Location: auth.php?tab=signup&error=pw');
  exit;
}
if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
  header('Location: auth.php?tab=signup&error=pw');
  exit;
}
// Skill required
if ($skill === '') {
  header('Location: auth.php?tab=signup');
  exit;
}

$_SESSION['user'] = [
  'email' => $email,
  'first' => $first,
  'last' => $last,
  // username removed
  'skill' => $skill,
];
header('Location: profile.php');
exit;

