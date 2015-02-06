<?php
require('AbstractController.php');

class TournamentController extends AbstractController {

	public function __construct($api, $logger) {
		parent::__construct($api, $logger);
	}

	public function get($id) {
		parent::verifyIsUserOrExit();
		
		$this->logger->debug('TournamentController: Getting tournament with tournamentId: ' - $id);

		$res = parent::getDBHandler()->getTournament($id);
		$res['program'] = json_decode($res['program']);
		$res['details'] = json_decode($res['details']);
		$res['misc'] = json_decode($res['misc']);

		$this->logger->debug('TournamentController: Got tournament ' - $res['id']);

		return parent::toJson($res);
	}

	public function getList() {
		parent::verifyIsUserOrExit();

		$this->logger->debug('TournamentController: Getting tournament list.');
		$res = parent::getDBHandler()->getTournamentsList();
		return parent::toJson($res);
	}

	public function create($id, $name, $language, $date, $deadline, $fee, $venue, $contact, 
		$image, $misc, $program, $details) {
		
		parent::verifyIsAdminOrExit();

		$this->logger->info('TournamentController: Create tournament called by ' . $_SESSION[parent::SESSION_USERNAME]);
		$this->logger->info("($id, $name, $date)");

		$res = parent::getDBHandler()->createTournament(
			$id, $name, $language, $date, $deadline, $fee,
			$venue, $contact, $image, $misc, $program, $details);

		return $parent::createResponseJSONObject($res);	
	}

	public function update($id, $name, $language, $date, $deadline, $fee, $venue, $contact,
		$image, $misc, $program, $details) {
		
		parent::verifyIsAdminOrExit();
		
		$this->logger->info('TournamentController: Update tournament called by ' . $_SESSION[parent::SESSION_USERNAME]);
		$this->logger->info("($id, $name, $date)");

		$res = parent::getDBHandler()->updateTournament(
			$id, $name, $language, $date, $deadline, $fee,
			$venue, $contact, $image, $misc, $program, $details);

		$this->logger->debug('TournamentController: Update result: ' . $res);
		return $parent::createResponseJSONObject($res);
	}

	public function delete($id) {
		parent::verifyIsAdminOrExit();

		$this->logger->info('TournamentController: Delete tournament called by ' . $_SESSION[parent::SESSION_USERNAME]);
		$this->logger->info("($id, $name, $date)");

		$res = parent::getDBHandler()->deleteTournament($id);

		$this->logger->debug('TournamentController: Delete result: ' . $res);
		return parent::createResponseJSONObject($res);
	}
}