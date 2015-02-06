<?php
require('AbstractController.php');

class IthfController extends AbstractController {

	public function __construct($api, $logger) {
		parent::__construct($api, $logger);
	}

	public function getAll() {
		parent::verifyIsUserOrExit();
		$res = parent::getDBHandler()->getAllITHFPlayers();
		$this->logger->debug('IthfController: Getting all ITHF players.');
		return parent::toJson($res);
	}

	public function search($name) {
		parent::verifyIsUserOrExit();
		$this->logger->debug('IthfController: Search for ITHF player named: ' . $name);
		$res = parent::getDBHandler()->searchITHFPlayers($name);
		return parent::toJson($res);
	}

	public function updateIthfTable() {
		$this->logger->info('IthfController: updateITHFTable called.');

		$ithfDataUrl = "http://ithf.info/stiga/ithf/ranking/ranking.txt";
		$ithfData = file_get_contents($ithfDataUrl);
		$ithfDataArr = explode("\n",($ithfData));
		
		array_shift($ithfDataArr); // remove first lines from file, this is not a player
		array_shift($ithfDataArr); // remove first lines from file, this is not a player
		array_pop($ithfDataArr); // remove the last line from file, this line is empty!

		$now = microtime();
		
		$success = parent::getDBHandler()->updateITHFTable($ithfDataArr, 200);

		echo microtime() - $now . '<hr>';
		
		if($success) {
			$this->logger->info('IthfController: WR successfully updated!');
		}
		else {
			$this->logger->error('IthfController: WR update failed!');
			parent::failAndExit();
		}

		return $success;
	}
}