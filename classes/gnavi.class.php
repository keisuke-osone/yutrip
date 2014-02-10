<?php

namespace Classes;

class Gnavi extends Api implements api_interface{
	private $area_code;
	private $pref_code;
	private $config;

	public function __construct() {
		$this->area_code = null;
		$this->pref_code = null;
		$this->config = \Classes\Config::get(get_class($this));
	}

	public function getAreaCode() {
		return $this->area_code;
	}

	public function getPrefCode() {
		return $this->pref_code;
	}

	public function setAreaCodeFromAreaName($area_name) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/xml/area.xml');
		foreach ($obj as $key => $val) {
			if ($area_name === $val->area_name) {
				$this->area_code = $val->area_code;
				break;
			}
		}
	}

	public function setPrefCodeFromPrefName($pref_name) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/xml/pref.xml');
		foreach ($obj as $key => $val) {
			if ($pref_name === $val->pref_name) {
				$this->pref_code = $val->pref_code;
				break;
			}
		}
	}

	public function setPrefCodeFromAreaCode($area_code) {
		$obj = simplexml_load_file(dirname(__FILE__) . '/xml/pref.xml');
		foreach ($obj as $key => $val) {
			if ($pref_code === $val->area_name) {
				$this->pref_code = $val->pref_code;
				break;
			}
		}
		return;
	}

	public function call($word=null) {
		if ($word == null) {
			return array();
		}

		$ret = array();
		try {
			$url = $this->config['ENDPOINT'] . 'keyid=' . $this->config['ACCESS_KEY'] . '&name=' . urlencode($word);

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