<?php

namespace Classes;

interface api_interface{
	public function setRange($param=0);
	public function call($geo=array(), $option=array());
}

class Api {

	protected static $conf;

	public static function getInstance($class_name=null) {
		if ($class_name == null) {
			error_log('No class name');
			exit;
		}
		self::$conf = \Conf\Config::get($class_name);
		require_once dirname(__FILE__) . '/' . $class_name . '.class.php';
		$class_name = '\Classes\\' . ucfirst($class_name);
		return new $class_name();
	}

//##########################################################
//	エラーが出ないようにinterfaceのメソッドを作っておく
//##########################################################

	public function setRange($param=0) {

	}

	public function call($geo=array(), $option=array()) {
		return array();
	}
}