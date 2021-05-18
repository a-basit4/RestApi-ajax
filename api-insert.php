<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers , Content-Type , Access-Control-Allow-Methods , Authorization,X-Requested-With');
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['sname'];
$age = $data['sage'];
$city = $data['scity'];

require_once("config.php");
$sql = "INSERT INTO student(student_name,age,city) values('{$name}',{$age},'{$city}')";
if(mysqli_query($conn, $sql)) {
  echo json_encode(array('message' => 'Data is Inserted', 'status' => true));
}else {
  echo json_encode(array('message' => "Can't Insert Data", 'status' => false));
}

?>
