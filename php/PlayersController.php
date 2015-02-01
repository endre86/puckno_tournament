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

	public function getTeam3For($subtournamentId) {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->getTeam3For($subtournamentId);
		return parent::toJson($res);
	}

	public function getTeam5For($subtournamentId) {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->getTeam5For($subtournamentId);
		return parent::toJson($res);
	}

	public function registerIthfPlayer($subtournamentId, $playerId) {
		parent::verifyIsUserOrExit();
		
		if(!is_int($subtournamentId) || !is_int($playerId)) {
			return parent::createResponseJSONObject('Expected input to be integers, got something else.');
		}

		$res = parent::getDBHandler()->registerITHFPlayer($subtournamentId, $playerId);
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

	public function registerTeam3($subtournamentId, $name, $player1, $player2, $player3) {
		parent::verifyIsUserOrExit();

		$subtournamentId = parent::cleanInput($subtournamentId);
		$name = parent::cleanInput($name);
		$player1 = parent::cleanInput($player1);
		$player2 = parent::cleanInput($player2);
		$player3 = parent::cleanInput($player3);

		$res = parent::getDBHandler()->registerTeam3($subtournamentId, $name, $player1, $player2, $player3);

		return parent::createResponseJSONObject($res);
	}

	public function registerTeam5($subtournamentId, $name, $player1, $player2, $player3, $player4, $player5) {
		parent::verifyIsUserOrExit();

		$subtournamentId = parent::cleanInput($subtournamentId);
		$name = parent::cleanInput($name);
		$player1 = parent::cleanInput($player1);
		$player2 = parent::cleanInput($player2);
		$player3 = parent::cleanInput($player3);
		$player4 = parent::cleanInput($player4);
		$player5 = parent::cleanInput($player5);

		$res = parent::getDBHandler()->registerTeam5($subtournamentId, $name, $player1, $player2, $player3, $player4, $player5);

		return parent::createResponseJSONObject($res);
	}
}