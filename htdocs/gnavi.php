<?php

require_once dirname(__FILE__) . '/../bootstrap.php';

//本番用
$geo = array(
	'latitude' => $_REQUEST['latitude'],
	'longitude' => $_REQUEST['longitude']
);

$geo = array(
	'latitude' => '35.0116391',
	'longitude' => '135.7680321'
);

$api = \Classes\Api::getInstance('gnavi');
$api->setRange(500);
$result = $api->call($geo);

echo json_encode($result);