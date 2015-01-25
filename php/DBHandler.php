<?php

class DBHandler {
	private $mysqli;

	public function __construct($host, $user, $password, $database) {
		$this->mysqli = new mysqli($host, $user, $password, $database);
		$this->mysqli->set_charset("utf8");
	}

	public function __destruct() {
		$this->mysqli->close();
	}

	public function getTournament($tournamentId) {
		$stmt = $this->mysqli->prepare('SELECT * FROM tournaments WHERE id=? LIMIT 1');

		$stmt->bind_param('s', $tournamentId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		$resArr = $result->fetch_array(MYSQLI_ASSOC);

		$stmt2 = $this->mysqli->prepare('SELECT * FROM subtournaments WHERE tournament_id=?');

		$stmt2->bind_param('s', $tournamentId);
		$stmt2->execute();

		$result2 = $stmt2->get_result();

		$resArr['subtournaments'] = array();
		while($r = $result2->fetch_assoc()) {
			array_push($resArr['subtournaments'], $r);
		}

		return $resArr;
	}


	public function getTournamentsList() {
		$stmt = $this->mysqli->prepare('SELECT id, name, date FROM tournaments ORDER BY date DESC');
		$stmt->execute();

		$results = $stmt->get_result();

		$resArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($resArr, $r);
		}

		return $resArr;
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

		return $this->executeAndReturnTrueOrError($stmt);
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

		return $this->executeAndReturnTrueOrError($stmt);
	}

	public function deleteTournament($tournamentId) {
		$stmt = $this->mysqli->prepare('DELETE FROM tournaments WHERE id=?');
		$stmt->bind_param('s', $tournamentId);
		return $this->executeAndReturnTrueOrError($stmt);
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

		$resArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($resArr, $r);
		}

		return $resArr;
	}

	public function getTeam3For($subtournamentId) {
		$stmt = $this->mysqli->prepare('SELECT * FROM subtournament_team3 WHERE subtournamentId=? ORDER BY name ASC');
		$stmt->bind_param('i', $subtournamentId);

		$stmt->execute();
		$results = $stmt->get_result();

		$resArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($resArr, $r);
		}

		return $resArr;
	}

	public function searchITHFPlayers($name) {
		$stmt = $this->mysqli->prepare('SELECT * FROM ithf_players WHERE player LIKE ?');
		$stmt->bind_param('s', $name);
		$stmt->execute();

		$results = $stmt->get_result();

		$jsonArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($jsonArr, $r);
		}

		return json_encode($jsonArr, JSON_UNESCAPED_UNICODE);
	}

	public function getAllITHFPlayers() {
		$stmt = $this->mysqli->prepare('SELECT * FROM ithf_players');
		$stmt->execute();

		$results = $stmt->get_result();

		$jsonArr = array();
		while($r = $results->fetch_assoc()) {
			array_push($jsonArr, $r);
		}

		return json_encode($jsonArr, JSON_UNESCAPED_UNICODE);
	}

	public function registerITHFPlayer($subtournamentId, $playerId) {
		$stmt = $this->mysqli->prepare('INSERT INTO subtournament_players (subtournament_id, player_id, local_player_flag, ithf_player_flag) VALUES (?,?,0,1)');

		$stmt->bind_param('ii', $subtournamentId, $playerId);
		
		return $this->executeAndReturnTrueOrError($stmt);
	}

	public function registerLocalPlayer($subtournamentId, $player, $club, $nation) {
		$stmt = $this->mysqli->prepare('INSERT INTO local_players (player, club, nation) VALUES (?,?,?)');
		$stmt->bind_param('sss', $player, $club, $nation);
		
		$res = $this->executeAndReturnTrueOrError($stmt);
		if(!$res == true) {
			return $res;
		}

		$playerId = $this->mysqli->insert_id;

		$stmt = $this->mysqli->prepare('INSERT INTO subtournament_players (subtournament_id, player_id, local_player_flag, ithf_player_flag) VALUES (?,?,1,0)');
		$stmt->bind_param('ii', $subtournamentId, $playerId);

		return $this->executeAndReturnTrueOrError($stmt);
	}

	public function registerTeam3($subtournamentId, $name, $player1, $player2, $player3) {
		$stmt = $this->mysqli->prepare('INSERT INTO subtournament_team3 (subtournamentId, name, player1, player2, player3) VALUES (?,?,?,?,?)');
		$stmt->bind_param('issss', $subtournamentId, $name, $player1, $player2, $player3);

		return $this->executeAndReturnTrueOrError($stmt);
	}

	public function createUser($username, $hashedPassword) {
		$stmt = $this->mysqli->prepare('INSERT INTO admins (username, password) VALUES (?,?)');
		$stmt->bind_param('ss', $username, $hashedPassword);
		return $this->executeAndReturnTrueOrError($stmt);
	}

	public function getHashedPasswordFor($username) {
		$stmt = $this->mysqli->prepare('SELECT password FROM admins WHERE username=?');
		$stmt->bind_param('s', $username);
		
		if(!$stmt->execute()) {
			return $stmt->error;
		}

		$result = $stmt->get_result();
		$result = $result->fetch_assoc();
		return $result['password'];
	}

	private function executeAndReturnTrueOrError($stmt) {
		if($stmt->execute()) {
			return true;
		}

		return $stmt->error;
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

 //require('Credentials.php');
 //$db = new DBHandler(
 //			DBCredentials::HOST, 
 //			DBCredentials::USER_USERNAME, 
 //			DBCredentials::USER_PASSWORD, 
 //			DBCredentials::DATABASE);
 //$db->getTournament('nm15');
 //echo $db->registerLocalPlayer('2', 'test', 'local', 'RON');
