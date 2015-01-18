<?php
require('AbstractController.php');

class IthfController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function get($name = null) {
		if(!isset($name)) {
			return $this->getAll();
		}

		return $this->search($name);
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