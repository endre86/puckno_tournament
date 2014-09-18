<?php

require('DBHandler.php');
require('Credentials.php');

abstract class AbstractController {
	const ADMIN = 'admin';
	const USER = 'user';

	private $api;
	private $dbHandler;



	protected function __construct($api) {
		$this->api = $api;

		$this->dbHandler = new DBHandler(
			DBCredentials::HOST, 
			DBCredentials::USER, 
			DBCredentials::PASSWORD, 
			DBCredentials::DATABASE);
	}

	protected function getDBHandler() {
		return $this->dbHandler;
	}

	protected function verifyIsUserOrExit() {
		if(!isset($_SESSION[$this::USER])) {
			$this->api->send403AndExit();
		}
	}

	protected function verifyIsAdminOrExit() {
		if(!isset($_SESSION[$this::ADMIN])) {
			$this->api->send403AndExit();
		}
	}
}