<?php
require_once('credentials.php');
require_once('DBHandler.php');

class TournamentController {

	private $dbHandler;

	public function __construct() {
		$this->dbHandler = new DBHandler(
			DBCredentials::HOST, 
			DBCredentials::USER, 
			DBCredentials::PASSWORD, 
			DBCredentials::DATABASE);
	}

	public function get($tournamentId) {
		return $this->dbHandler->getTournament($tournamentId);
	}
}