<?php
require('AbstractController.php');

class TournamentController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function get($id = null) {
		if(empty($id)) {
			return $this->getList();
		}

		return $this->getTournament($id);
	}

	public function post($id = null, $data) {
		if(empty($id)) {
			return $this->create($data);
		}

		return $this->update($id, $data);
	}

	public function getTournament($id) {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->getTournament($id);
	}

	public function getList() {
		parent::verifyIsUserOrExit();
		return parent::getDBHandler()->getTournamentsList();
	}

	public function create($dataAssocArray) {
		parent::verifyIsAdminOrExit();

		$id = $dataAssocArray['id'];
		$name = $dataAssocArray['name'];
		$language = $dataAssocArray['language'];
		$date = $dataAssocArray['date'];
		$deadline = $dataAssocArray['deadline'];
		$fee = $dataAssocArray['fee'];
		$venue = $dataAssocArray['venue'];
		$contact = $dataAssocArray['contact'];
		$image = $dataAssocArray['image'];
		$misc = $dataAssocArray['misc'];
		$program = $dataAssocArray['program'];
		$details = $dataAssocArray['details'];

		return parent::getDBHandler()->createTournament(
			$id, $name, $language, $date, $deadline, $fee,
			$venue, $contact, $image, $misc, $program, $details);		
	}

	public function update($id, $dataAssocArray) {
		parent::verifyIsAdminOrExit();
		
		$name = $dataAssocArray['name'];
		$language = $dataAssocArray['language'];
		$date = $dataAssocArray['date'];
		$deadline = $dataAssocArray['deadline'];
		$fee = $dataAssocArray['fee'];
		$venue = $dataAssocArray['venue'];
		$contact = $dataAssocArray['contact'];
		$image = $dataAssocArray['image'];
		$misc = $dataAssocArray['misc'];
		$program = $dataAssocArray['program'];
		$details = $dataAssocArray['details'];

		return parent::getDBHandler()->updateTournament(
			$id, $name, $language, $date, $deadline, $fee,
			$venue, $contact, $image, $misc, $program, $details);
	}

	public function delete($id) {
		return parent::getDBHandler()->deleteTournament($id);
	}
}