<?php

$obj = simplexml_load_file("area.xml");

foreach ($obj as $key => $val) {
	echo '\'' . $val->area_name . '\' => ' . '\'' . $val->area_code . '\'';
	echo "\n";
}
