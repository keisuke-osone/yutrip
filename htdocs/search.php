<?php

require_once dirname(__FILE__) . '/../bootstrap.php';

//本番用
$geo = array(
	'latitude' => round($_REQUEST['latitude'], 7),
	'longitude' => round($_REQUEST['longitude'], 7)
);

// $geo = array(
// 	'latitude' => '35.0116391',
// 	'longitude' => '135.7680321'
// );

$api = \Classes\Api::getInstance('gnavi');
$api->setRange(500);
$result['g'] = $api->call($geo);

$api = \Classes\Api::getInstance('pb');
$option['transportation'] = 'cycle';
$api->setRange(500);
$result['p'] = $api->call($geo, $option);

echo json_encode($result);