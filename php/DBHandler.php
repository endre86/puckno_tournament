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

		$stmt->bind_param('s', $tournamentId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		$resArray = array();
		
		$resArr = $result->fetch_array(MYSQLI_ASSOC);
		$resArr = $this->utf8Encode($resArr);

		$stmt2 = $this->mysqli->prepare('SELECT * FROM subtournaments WHERE tournament_id=?');

		$stmt2->bind_param('s', $tournamentId);
		$stmt2->execute();

		$result2 = $stmt2->get_result();

		$resArr2 = array();
		$resArr['subtournaments'] = array();
		while($r = $result2->fetch_assoc()) {
			array_push($resArr2, $r);
		}

		$resArr2 = $this->utf8Encode($resArr2);
		$resArr['subtournaments'] = json_encode($resArr2);

		return $this->arrayToJsonHelper($resArr);
	}

	public function getTournamentsList() {
		$stmt = $this->mysqli->prepare('SELECT id, name, date FROM tournaments');
		$stmt->execute();

		$results = $stmt->get_result();

		$jsonArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($jsonArr, $this->utf8Encode($r));
		}

		return json_encode($jsonArr, JSON_UNESCAPED_UNICODE);
	}

	public function createTurnament($id, $name, $language, $date, $deadline, 
		$fee, $venue, $contact, $image, $misc, $program, $details) {
		$stmt = $this->mysqli->prepare('
			INSERT INTO tournaments (id, name, language, date, deadline, 
				fee, venue, contact, image, misc, program, details) 
			VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
			');

		$stmt->bind_param('ssssssssssss',
			$id, $name, $language, $date, $deadline, $fee, $venue,
			$contact, $image, $misc, $program, $details);

		return $this->executeAndReturnSuccessObj();
	}

	public function updateTurnament($id, $name, $language, $date, $deadline, 
		$fee, $venue, $contact, $image, $misc, $program, $details) {
		$stmt = $this->mysqli->prepare('
			UPDATE tournaments SET
				name=?,
				language=?,
				date=?,
				deadline=?,
				fee=?,
				venue=?,
				contact=?,
				image=?,
				misc=?,
				program=?,
				details) 
			WHERE id=?;
			');

		$stmt->bind_param('ssssssssssss',
			$name, $language, $date, $deadline, $fee, $venue,
			$contact, $image, $misc, $program, $details, $id);

		return $this->executeAndReturnSuccessObj();
	}

	public function deleteTournament($tournamentId) {
		$stmt = $this->mysqli->prepare('DELETE FROM tournaments WHERE id=?');
		$stmt->bind_param('s', $tournamentId);
		return $this->executeAndReturnSuccessObj();
	}

	public function getPlayersFor($subtournamentId) {
		$sql = '
			SELECT id, player, club, nation, rank, points, best, \'ithf\' AS type
			FROM subtournament_players
			LEFT JOIN (ithf_players)
			ON (subtournament_players.player_id=ithf_players.id)
			WHERE subtournament_id=? AND ithf_player_flag=true
			UNION
			SELECT id, player, club, nation, \'N/A\' AS rank, 0 AS points, 0 AS best, \'local\' AS type
			FROM subtournament_players
			LEFT JOIN (local_players)
			ON(subtournament_players.player_id=local_players.id)
			WHERE subtournament_id=? AND local_player_flag=true
		';

		$stmt = $this->mysqli->prepare($sql);
		$stmt->bind_param('ii', $subtournamentId, $subtournamentId);
		$stmt->execute();

		$results = $stmt->get_result();

		$jsonArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($jsonArr, $this->utf8Encode($r));
		}

		return json_encode($jsonArr, JSON_UNESCAPED_UNICODE);
	}

	private function executeAndReturnSuccessObj($stmt) {
		if($stmt->execute()) {
			return '{"success" : "true"}';
		}

		return '{"success" : "false"}';
	}

	private function utf8Encode($data) {
		if(!is_array($data)) {
			return utf8_encode($data);
		}

		foreach($data as $key => $value) {
			$data[$key] = $this->utf8Encode($value);
		}

		return $data;
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
				if(is_array($value)) {
					return '"' . $key .'":[' . $this->arrayToJsonHelper($value) . ']';
				}
				else if(substr($value, 0, 1) == '[' ||
				   substr($value, 0, 1 == '{')) {
					return '"' . $key . '":' . $value;
				}

				return '"' . $key . '":"' . $value . '"';
			}, $array, array_keys($array))) . '}';
	}

}

// require('Credentials.php');
// $db = new DBHandler(
// 			DBCredentials::HOST, 
// 			DBCredentials::USER, 
// 			DBCredentials::PASSWORD, 
// 			DBCredentials::DATABASE);
// echo $db->getPlayersFor(1);
