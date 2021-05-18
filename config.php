<?php 
session_start();

$hostName = 'http://localhost/php/crud_ajax';
$basePath = $_SERVER['DOCUMENT_ROOT'].'/php/crud_ajax';

// Database Connection

$conn = mysqli_connect('localhost','root','B@$!tmy$qll!te3','php') or die('Connection Failed : ' .mysqli_connect_error());
 ?>