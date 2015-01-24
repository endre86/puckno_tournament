<?php
require('AbstractController.php');

class PlayersController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function getPlayersFor($subtournamentId) {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->getPlayersFor($subtournamentId);
		return parent::toJson($res);
	}

	public function registerIthfPlayer($subtournamentId, $playerId) {
		parent::verifyIsUserOrExit();
		
		if(!is_int($data['subtournamentId']) || is_int($data['playerId'])) {
			return parent::createResponseJSONObject('Expected input data to be integers, got something else.');
		}

		$res = parent::getDBHandler()->registerITHFPlayer($data['subtournamentId'], $data['playerId']);
		return parent::createResponseJSONObject($res);
	}

	public function registerLocalPlayer($subtournamentId, $player, $club, $nation) {
		parent::verifyIsUserOrExit();

		$subtournamentId = parent::cleanInput($subtournamentId);
		$player = parent::cleanInput($player);
		$club = parent::cleanInput($club);
		$nation = parent::cleanInput($nation);

		$res = parent::getDBHandler()->registerLocalPlayer($subtournamentId, $player, $club, $nation);
		return parent::createResponseJSONObject($res);
	}
}