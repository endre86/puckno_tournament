<?php
require('AbstractController.php');

class PlayersController extends AbstractController {

	public function __construct($api, $logger) {
		parent::__construct($api, $logger);
	}

	public function getPlayersFor($subtournamentId) {
		parent::verifyIsUserOrExit();

		$this->logger->debug('PlayersController: Getting players for subtournament: ' . $subtournamentId);
		$res = parent::getDBHandler()->getPlayersFor($subtournamentId);
		return parent::toJson($res);
	}

	public function registerIthfPlayer($subtournamentId, $playerId) {
		parent::verifyIsUserOrExit();
		
		if(!is_int($subtournamentId) || !is_int($playerId)) {
			$this->logger->info('PlayersController: bad input for registerITHFPlayer: subtournamentId=' . $subtournamentId . '; playerId=' . $playerId);
			return parent::createResponseJSONObject('Expected input to be integers, got something else.');
		}

		$this->logger->debug('PlayersController: Registering ITHF player: subtournamentId=' . $subtournamentId . '; playerId=' . $playerId);
		$res = parent::getDBHandler()->registerITHFPlayer($subtournamentId, $playerId);
		return parent::createResponseJSONObject($res);
	}

	public function registerLocalPlayer($subtournamentId, $player, $club, $nation) {
		parent::verifyIsUserOrExit();

		$subtournamentId = parent::cleanInput($subtournamentId);
		$player = parent::cleanInput($player);
		$club = parent::cleanInput($club);
		$nation = parent::cleanInput($nation);

		$this->logger->info("PlayersController: Registering local player: ($subtournamentId, $player, $club, $nation)");

		$res = parent::getDBHandler()->registerLocalPlayer($subtournamentId, $player, $club, $nation);
		return parent::createResponseJSONObject($res);
	}
}