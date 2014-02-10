<?php

namespace Classes;

class Position extends Api implements api_interface{
	private $latitude;
	private $longitude;
	private $config;

	public function __construct() {
		// $this->latitude = null;
		// $this->longitude = null;
		$this->config = \Classes\Config::get(get_class($this));
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