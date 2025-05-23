<?php
session_start();
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        echo "<pre>";
        echo "Entered Password: $password\n";
        echo "Stored Hash: " . $row['password'] . "\n";
        echo "</pre>";

        // Verify the password
        if (password_verify($password, $row['password'])) {
            $_SESSION['email'] = $email;
            $_SESSION['username'] = $row['username'];
            echo "<h2 style='color:green;'>✅ Login successful!</h2>";
            // header("Location: ../jobs/job-details.html");

            header("Location: ../jobs/job-details.html");
            exit();
            
        } else {
            echo "<h2 style='color:red;'>❌ Incorrect password.</h2>";
        }
    } else {
        echo "<h2 style='color:red;'>❌ Email not found.</h2>";
    }
}
?>
