<?php
require('AbstractController.php');

class PlayersController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function get($subtournamentId) {
		return $this->getPlayersFor($subtournamentId);
	}

	public function post($subtournamentId, $data) {
		return $this->registerPlayer($subtournamentId, $data);
	}

	public function getPlayersFor($subtournamentId) {
		return parent::getDBHandler()->getPlayersFor($subtournamentId);
	}

	public function registerPlayer($subtournamentId, $data) {
		if($data['type'] == 'ithf') {
			// return parent::getDBHandler()->registerITHFPlayer($data['subtournamentId'], $data['playerId']);
		}

		if($data['type'] == 'local') {
			// return parent::getDBHandler()->registerLocalPlayer(...); // create new local player
		}
	}
}