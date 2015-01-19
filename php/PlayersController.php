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

	public function registerIthfPlayer($data) {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->registerITHFPlayer($data['subtournamentId'], $data['playerId']);
		return parent::createResponseJSONObject($res);
	}

	public function registerLocalPlayer($data) {
		parent::verifyIsUserOrExit();

		$data['player'] = mysqli_escape_string($data['player']);
		$data['club'] = mysqli_escape_string($data['club']);
		$data['nation'] = mysqli_escape_string($data['nation']);
		$res = parent::getDBHandler()->registerLocalPlayer(
			$data['subtournamentId'], $data['player'], $data['club'], $data['nation']);
		return parent::createResponseJSONObject($res);
	}
}