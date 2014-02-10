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
}