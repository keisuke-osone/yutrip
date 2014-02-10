<?php

require_once dirname(__FILE__) . '/../bootstrap.php';

//ぐるなびAPIの例
//$api = \Classes\Api::getInstance('gnavi');
//$result = $api->call('先斗町');

//京都APIの例
 $api = \Classes\Api::getInstance('pb');
 $result = $api->call('cycle', '00001C0000000000001F001BFC7A7212');

echo json_encode($result);