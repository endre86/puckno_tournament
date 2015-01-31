<?php
require('AbstractController.php');

class IthfController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function getAll() {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->getAllITHFPlayers();
		return parent::toJson($res);
	}

	public function search($name) {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->searchITHFPlayers($name);
		return parent::toJson($res);
	}

	public function updateIthfTable() {
		$ithfDataUrl = "http://ithf.info/stiga/ithf/ranking/ranking.txt";
		$ithfData = file_get_contents($ithfDataUrl);
		$ithfDataArr = explode("\n",($ithfData));
		
		array_shift($ithfDataArr); // remove first lines from file, this is not a player
		array_shift($ithfDataArr); // remove first lines from file, this is not a player
		array_pop($ithfDataArr); // remove the last line from file, this line is empty!

		$now = microtime();
		
		$success = parent::getDBHandler()->updateITHFTable($ithfDataArr, 200);

		echo microtime() - $now . '<hr>';
		return $success;
	}
}