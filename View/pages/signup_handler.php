<?php
// ensure session
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// include DB connection - correct path from pages/ to includes/
require_once __DIR__ . '/../includes/dbh.inc.php';

if (!isset($conn) || $conn === null) {
  echo "<p style='color:red;'>DB connection not found. Confirm includes/dbh.inc.php defines \$conn (mysqli) and path is correct.</p>";
  exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // accept either form naming conventions used in project
  $first = isset($_POST['FName']) ? trim($_POST['FName']) : (isset($_POST['first_name']) ? trim($_POST['first_name']) : '');
  $last  = isset($_POST['LName']) ? trim($_POST['LName']) : (isset($_POST['last_name']) ? trim($_POST['last_name']) : '');
  $email = isset($_POST['Email']) ? trim($_POST['Email']) : (isset($_POST['email2']) ? trim($_POST['email2']) : '');
  $password = isset($_POST['Password']) ? $_POST['Password'] : (isset($_POST['password2']) ? $_POST['password2'] : '');
  $skill = isset($_POST['Hobby']) ? trim($_POST['Hobby']) : (isset($_POST['skill']) ? trim($_POST['skill']) : '');

  // basic required checks
  if ($first === '' || $last === '' || $email === '' || $password === '') {
    echo "<p style='color:red;'>Missing required fields.</p>";
    exit;
  }

  $hashed = password_hash($password, PASSWORD_DEFAULT);

  // use the `users` table and the exact column names shown in your DB (they contain spaces)
  $sql = "INSERT INTO `users` (`First Name`, `Last Name`, `Email`, `Password`, `Skill`) VALUES (?, ?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  if ($stmt === false) {
    echo "<p style='color:red;'>Prepare failed: " . htmlspecialchars($conn->error) . "</p>";
    $conn->close();
    exit;
  }

  $stmt->bind_param("sssss", $first, $last, $email, $hashed, $skill);

  if ($stmt->execute()) {
    // set session from DB values
    $_SESSION['user'] = [
      'id'    => $conn->insert_id,
      'email' => $email,
      'first' => $first,
      'last'  => $last,
      'skill' => $skill,
    ];
    $stmt->close();
    $conn->close();
    header('Location: auth.php');
    exit;
  } else {
    echo "<p style='color:red;'>Execute failed: " . htmlspecialchars($stmt->error) . "</p>";
  }

  $stmt->close();
  $conn->close();
}
?>

