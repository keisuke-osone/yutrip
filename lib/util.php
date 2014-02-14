<?php

namespace Lib;


class Util {

	public static function checkGeoInfo($geo=array()) {
		if (isset($geo['latitude']) !== true || isset($geo['longitude']) !== true) {
			error_log('latitude=' . $latitude . ' longitude=' . $longitude);
			echo 'Geo infomation not found';
			return false;
		}
		return true;
	}

	public static function getNumber($value) {
		if (preg_match('/^[0-9]+$/', $value) !== 1) {
			return 0;
		}

		return intval($value);
	}
}