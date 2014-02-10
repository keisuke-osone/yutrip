<?php

namespace Classes;

require_once dirname(__FILE__) . '/config.php';


interface api_interface{
	public function call($word=null);
}

class Api {

	public static function getInstance($class_name=null) {
		if ($class_name == null) {
			error_log('No class name');
			exit;
		}

		require_once dirname(__FILE__) . '/' . $class_name . '.class.php';
		$class_name = '\Classes\\' . ucfirst($class_name);
		return new $class_name();
	}

	public function call($word=null) {
		return null;
	}
}