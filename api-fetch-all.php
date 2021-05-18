<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin: *');

require_once("config.php");
$sql = "SELECT * from student";
$result = mysqli_query($conn, $sql) or die("Query Failed.".mysqli_error($conn));

if(mysqli_num_rows($result)) {
  $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
  echo json_encode($output);
}else {
  echo json_encode(array('message' => 'No Record Found', 'status' => false));
}

?>
