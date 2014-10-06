<?php
require('AbstractController.php');

class PlayersController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function get($subtournamentId) {
		return $this->getPlayersFor($subtournamentId);
	}

	public function post() {
		$data = file_get_contents("php://input");
		$data = json_decode($data, true);
		if($data['type'] == 'ithf') {
			return $this->registerIthfPlayer($data);
		}

		return $this->registerLocalPlayer($data);
	}

	public function getPlayersFor($subtournamentId) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->getPlayersFor($subtournamentId);
	}

	public function registerIthfPlayer($data) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->registerITHFPlayer($data['subtournamentId'], $data['playerId']);
	}

	public function registerLocalPlayer($data) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->registerLocalPlayer(
			$data['subtournamentId'], $data['player'], $data['club'], $data['nation']);
	}
}