<?php
require('AbstractController.php');

class TournamentController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function get($tournamentId) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->getTournament($tournamentId);
	}
}