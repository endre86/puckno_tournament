<?php
require('AbstractController.php');

class TeamsController extends AbstractController {
	public function __construct($api, $logger) {
		parent::__construct($api, $logger);
	}

	public function getTeam3For($subtournamentId) {
		parent::verifyIsUserOrExit();

		$this->logger->debug('TeamsController: Getting Team3 for subtournamentId ' . $subtournamentId);
		$res = parent::getDBHandler()->getTeam3For($subtournamentId);
		return parent::toJson($res);
	}

	public function getTeam5For($subtournamentId) {
		parent::verifyIsUserOrExit();

		$this->logger->debug('TeamsController: Getting Team5 for subtournamentId ' . $subtournamentId);
		$res = parent::getDBHandler()->getTeam5For($subtournamentId);
		return parent::toJson($res);
	}

	public function registerTeam3($subtournamentId, $name, $player1, $player2, $player3) {
		parent::verifyIsUserOrExit();

		$subtournamentId = parent::cleanInput($subtournamentId);
		$name = parent::cleanInput($name);
		$player1 = parent::cleanInput($player1);
		$player2 = parent::cleanInput($player2);
		$player3 = parent::cleanInput($player3);

		$this->logger->info("TeamsController: Registering Team3: ($subtournamentId, $name, $player1, $player2, $player3).");

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

		$this->logger->info("TeamsController: Registering Team5: ($subtournamentId, $name, $player1, $player2, $player3, $player4, $player5).");

		$res = parent::getDBHandler()->registerTeam5($subtournamentId, $name, $player1, $player2, $player3, $player4, $player5);

		return parent::createResponseJSONObject($res);
	}
}