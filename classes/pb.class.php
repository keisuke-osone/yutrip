<?php

namespace Classes;

class Pb extends Api implements api_interface {

	private $offset;
	private $limit;
	private $range;

	public function __construct() {
		$this->offset = 0;
		$this->limit  = 0;
		$this->range  = parent::$conf['RANGE_DEFAULT_VALUE'];				//range default val
	}

	public function offset($offset_num) {
		$this->offset = $offset_num;
	}

	public function limit($limit_num) {
		$this->limit = $limit_num;
	}

	public function setRange($range=0) {
		$this->range = $range;
		if ($range <= 0) {
			$this->range = parent::$conf['RANGE_DEFAULT_VALUE'];
		}
	}

	public function call($geo=array(), $option=array()) {

		if (\Lib\Util::checkGeoInfo($geo) !== true) {
			return array();
		}

		if (isset($option['transportation']) !== true) {
			$transportation = 'cycle';
		}

		if ($transportation === 'car') {
			$ugx_targetTransportation = 'ugx_Car';
		} else if ($transportation === 'cycle') {
			$ugx_targetTransportation = 'ugx_Cycle';
		} else if ($transportation === 'both') {
			$ugx_targetTransportation = 'ugx_Car,ugx_Cycle';
		}

		$url = parent::$conf['ENDPOINT'] 
			. '&ugx_targetTransportation=' . $ugx_targetTransportation
			. '&lat=' . $geo['latitude'] 
			. '&lon=' . $geo['longitude'] 
			. '&radius=' . $this->range;

		if ($this->limit > 0) {
			$url = $url . '&limit=' . $this->limit;
		}

		$ret = array();
		try {

			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_USERPWD, parent::$conf['USER_ID'] . ':' . parent::$conf['PASSWORD']);
			curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
			$content = curl_exec($ch);
			$result = curl_getinfo($ch);
			curl_close($ch);

			if ($content === false) {
				throw new Exception(curl_error($ch), curl_errno($ch));
				return array();
			}
			$ret = json_decode($content);
		} catch (Exception $e) {
			error_log($e->getMessage());
		}

		return $ret;
	}

}