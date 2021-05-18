<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin: *');
// $data = json_decode(file_get_contents('php://input'), true);
// $term = $data['term'];

$term = isset($_GET['term']) ? $_GET['term'] : die();

require_once("config.php");
$sql = "SELECT * from student where student_name like '%{$term}%'";
$result = mysqli_query($conn, $sql) or die("Query Failed.".mysqli_error($conn));

if(mysqli_num_rows($result)) {
  $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
  echo json_encode($output);
}else {
  echo json_encode(array('message' => 'No Search Found', 'status' => false));
}

?>
