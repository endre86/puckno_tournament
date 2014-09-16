<?php

class DBHandler {
	private $mysqli;

	public function __construct($host, $user, $password, $database) {
		$this->mysqli = new mysqli($host, $user, $password, $database);
	}

	public function __destruct() {
		$this->mysqli->close();
	}

	public function getTournament($tournamentId) {
		$stmt = $this->mysqli->prepare('SELECT * FROM tournaments WHERE id=? LIMIT 1');

		$stmt->bind_param("s", $tournamentId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		$resArray = array();
		
		$resArr = $result->fetch_array(MYSQLI_ASSOC);
		return $this->arrayToJsonHelper($resArr);
	}

	/**
	 * Used when a string in the array is
	 * a json array or object.
	 *
	 * Ex: array['x'] = "[{\"key\" : \"value\"}]"
	 */
	private function arrayToJsonHelper($array) {
		if(!is_array($array)) return '{}';
		return '{' .
			implode(',', array_map(function($value, $key) {
				if(substr($value, 0, 1) == '[' ||
				   substr($value, 0, 1 == '{')) {
					return '"' . $key . '":' . $value;
				}

				return '"' . $key . '":"' . $value . '"';
			}, $array, array_keys($array))) . '}';
	}

}