<?php

namespace Conf;

class Config {
	public static function get($name) {
		if ($name === 'gnavi') {
			return array(
						'ACCESS_KEY' => '15a94eb4a45b862a4dcff62a5972bc0f',
						'ENDPOINT' => 'http://api.gnavi.co.jp/ver1/RestSearchAPI/?',
						'RANGE_DEFAULT_VALUE' => 2
					);
		} else if ($name === 'pb') {
			return array(
						'USER_ID' => 'takashi.honda',
						'PASSWORD' => '=l2jrDE6i',
						'ENDPOINT' => 'https://kyoto.smartercity.jp/api/v1/places?rdf_type=ugx_Parking',
						'RANGE_DEFAULT_VALUE' => 500
					);
		}

	}
}