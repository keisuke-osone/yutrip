<?php

namespace Classes;

class Pb extends Api implements api_interface{

	private $offset;
	private $limit;
	private $config;

	public function __construct() {
		$this->offset = 0;
		$this->limit  = 0;
		$this->config = \Classes\Config::get(get_class($this));
	}

	public function offset($offset_num) {
		$this->offset = $offset_num;
	}

	public function limit($limit_num) {
		$this->limit = $limit_num;
	}

	public function call($transportation=null, $ucode=null) {

		if ($transportation == null || $ucode == null) {
			error_log('transportation=' . $transportation . ' ucode=' . $ucode);
			return array();
		}

		$ret = array();
		try {

			if ($transportation === 'car') {
				$ugx_targetTransportation = 'ugx_Car';
			} else if ($transportation === 'cycle') {
				$ugx_targetTransportation = 'ugx_Cycle';
			} else if ($transportation === 'both') {
				$ugx_targetTransportation = 'ugx_Car,ugx_Cycle';
			}

			$url = $this->config['ENDPOINT'] . '&ugx_targetTransportation=' . $ugx_targetTransportation 
					. '&target=ucode_' . $ucode . '&offset=' . $this->offset;

			if ($this->limit > 0) {
				$url = $url . '&limit=' . $this->limit;
			}

			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_USERPWD, $this->config['USER_ID'] . ':' . $this->config['PASSWORD']);
			curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
			$content = curl_exec($ch);
			$result = curl_getinfo($ch);
			curl_close($ch);

			if ($content === false) {
				throw new Exception(curl_error($ch), curl_errno($ch));
				return array();
			}
			$ret = json_encode($content);
		} catch (Exception $e) {
			error_log($e->getMessage());
		}

		return $ret;
	}

}