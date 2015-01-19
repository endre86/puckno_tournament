<?php
require('AbstractController.php');

class IthfController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function getAll() {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->getAllITHFPlayers();
	}

	public function search($name) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->searchITHFPlayers($name);
	}
}