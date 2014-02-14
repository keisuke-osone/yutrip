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
$api->setRange($_REQUEST['g_range']);
$api->setLimit($_REQUEST['g_linmit']);
$api->setOffset($_REQUEST['g_offset']);
$result['g'] = $api->call($geo);

$api = \Classes\Api::getInstance('pb');
$option['transportation'] = 'cycle';
$api->setRange($_REQUEST['pb_range']);
$api->setLimit($_REQUEST['pb_linmit']);
$api->setOffset($_REQUEST['pb_offset']);
$result['p'] = $api->call($geo, $option);

header('content-type: application/json; charset=utf-8');
echo json_encode($result);