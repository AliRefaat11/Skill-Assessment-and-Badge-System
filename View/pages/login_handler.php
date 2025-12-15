<?php
session_start();

require_once __DIR__ . '/../includes/dbh.inc.php';
if (!isset($conn) || $conn === null) {
  echo "DB connection not found.";
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: auth.php?tab=login');
  exit;
}

$email = isset($_POST['Email']) ? trim($_POST['Email']) : (isset($_POST['email']) ? trim($_POST['email']) : '');
$password = isset($_POST['Password']) ? $_POST['Password'] : (isset($_POST['password']) ? $_POST['password'] : '');

if ($email === '' || $password === '') {
  header('Location: auth.php?tab=login&error=missing');
  exit;
}

$sql = "SELECT `ID`, `First Name` AS fn, `Last Name` AS ln, `Email` AS em, `Password` AS pwd, `Skill` AS skill
        FROM `users` WHERE `Email` = ? LIMIT 1";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
  header('Location: auth.php?tab=login&error=db');
  exit;
}

$stmt->bind_param('s', $email);
if (!$stmt->execute()) {
  $stmt->close();
  header('Location: auth.php?tab=login&error=db');
  exit;
}

$user = null;
if (method_exists($stmt, 'get_result')) {
  $res = $stmt->get_result();
  $user = $res->fetch_assoc();
} else {
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $fn, $ln, $em, $pwd, $skill);
    $stmt->fetch();
    $user = ['ID'=>$id, 'fn'=>$fn, 'ln'=>$ln, 'em'=>$em, 'pwd'=>$pwd, 'skill'=>$skill];
  }
}
$stmt->close();

if (!$user) {
  header('Location: auth.php?tab=login&error=notfound');
  exit;
}

if (!isset($user['pwd']) || !password_verify($password, $user['pwd'])) {
  header('Location: auth.php?tab=login&error=invalid');
  exit;
}

$_SESSION['ID'] = $user['ID'];
$_SESSION['FirstName'] = $user['fn'];
$_SESSION['LastName'] = $user['ln'];
$_SESSION['Email'] = $user['em'];
$_SESSION['Password'] = $user['pwd']; // store hash only
$_SESSION['Skill'] = $user['skill'];

$conn->close();
header('Location: profile.php');
exit;
?>
