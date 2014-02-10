<?php

namespace Classes;

class Gnavi extends Api implements api_interface {
	private $area_code;
	private $pref_code;
	private $range;
	private $config;

	public function __construct() {
		$this->area_code 	= null;
		$this->pref_code 	= null;
		$this->config 		= \Classes\Config::get(get_class($this));
		$this->range 		= $this->config['RANGE_DEFAULT_VALUE'];				//range default val
	}

	public function getAreaCode() {
		return $this->area_code;
	}

	public function getPrefCode() {
		return $this->pref_code;
	}

	public function setAreaCodeFromAreaName($area_name) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/../xml/area.xml');
		foreach ($obj as $key => $val) {
			if ($area_name === $val->area_name) {
				$this->area_code = $val->area_code;
				break;
			}
		}
	}

	public function setPrefCodeFromPrefName($pref_name) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/../xml/pref.xml');
		foreach ($obj->pref as $key => $val) {
			$pref_name_array = (array) $val->pref_name;
			if ($pref_name === $pref_name_array[0]) {
				$pref_code_array = (array) $val->pref_code;
				$this->pref_code = $pref_code_array[0];
				break;
			}
		}
	}

	public function setPrefCodeFromAreaCode($area_code) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/../xml/pref.xml');
		foreach ($obj as $key => $val) {
			$area_name_array = (array) $val->area_name;
			if ($pref_code === $area_name_array[0]) {
				$this->pref_code = $area_name_array[0];
				break;
			}
		}
		return;
	}

	public function setRange($range=0) {
		if ($range <= 300) {
			$this->range = 1;
		} else if ($range <= 500) {
			$this->range = 2;
		} else if ($range <= 1000) {
			$this->range = 3;
		} else if ($range <= 2000) {
			$this->range = 4;
		} else {
			$this->range = 5;
		}
	}

	public function call($geo=array(), $option=array()) {
		if (\Lib\Util::checkGeoInfo($geo) !== true) {
			error_log('latitude=' . $latitude . ' longitude=' . $longitude);
			return array();
		}

		$url = $this->config['ENDPOINT'] 
			. 'keyid=' . $this->config['ACCESS_KEY'] 
			. '&input_coordinates_mode=1&range=' 
			. $this->range . '&latitude=' 
			. $geo['latitude'] . '&longitude=' 
			. $geo['longitude'];

		$ret = array();
		try {

			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
			$content = curl_exec($ch);
			$result = curl_getinfo($ch);
			curl_close($ch);

			if ($content === false) {
				throw new Exception(curl_error($ch), curl_errno($ch));
				return array();
			}

			$ret = simplexml_load_string($content);
		} catch (Exception $e) {
			error_log($e->getMessage());
		}

		return $ret;
	}

}