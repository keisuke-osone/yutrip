<?php

require_once dirname(__FILE__) . '/../bootstrap.php';


$geo = array(
	'latitude' => '35.0116391',
	'longitude' => '135.7680321'
);

//ぐるなびAPIの例
// $api = \Classes\Api::getInstance('gnavi');
// $api->setRange(500);
// $result = $api->call($geo);

//京都APIの例
$api = \Classes\Api::getInstance('pb');
$option['transportation'] = 'cycle';
$api->setRange(500);
$result = $api->call($geo, $option);

echo json_encode($result);