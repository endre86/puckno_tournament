<?php

require_once('lib/KLogger.php');
require_once('DBHandler.php');
require_once('Credentials.php');

abstract class AbstractController {
	const ADMIN = 'admin';
	const USER = 'user';
	const SESSION_USERNAME = 'username';

	private $api;
	private $dbHandler;

	protected $logger;

	protected function __construct($api, $logger) {
		$this->api = $api;
		$this->logger = $logger;

		$username;
		$password;
		if(isset($_SESSION[$this::ADMIN])) {
			$username = DBCredentials::ADMIN_USERNAME; 
			$password = DBCredentials::ADMIN_PASSWORD;	
		}
		else if(isset($_SESSION[$this::USER])) {
			$username = DBCredentials::USER_USERNAME;
			$password = DBCredentials::USER_PASSWORD;
		}
		else {
			$this->api->send403AndExit();
		}

		$this->dbHandler = new DBHandler(
			DBCredentials::HOST, 
			$username,
			$password, 
			DBCredentials::DATABASE);
	}

	protected function getDBHandler() {
		return $this->dbHandler;
	}

	protected function verifyIsUserOrExit() {
		if(!isset($_SESSION[$this::USER])) {
			$this->logger->debug('AbstractController: Exit on verifyIsUserOrExit');
			$this->api->send403AndExit();
		}
	}

	protected function verifyIsAdminOrExit() {
		if(!isset($_SESSION[$this::ADMIN])) {
			$this->logger->debug('AbstractController: Exit on verifyIsAdminOrExit');
			$this->api->send403AndExit();
		}
	}

	protected function failAndExit() {
		$this->logger->debug('AbstractController: Exit on failAndExit');
		$this->api->send420AndExit();
	}

	protected function createResponseJSONObject($response) {
		if(is_bool($response) && $response == true) {
			return $this->createSuccessJSONObject();
		}

		return $this->createErrorJSONObject($response);

	}

	protected function getPostData() {
		$data = file_get_contents("php://input");
		$data = json_decode($data, true);
		return $data;
	}

	protected function createSuccessJSONObject() {
		return '{"status":"success"}';
	}

	protected function createErrorJSONObject($message) {
		return '{"status":"error", "message":"'.$message.'"}';
	}

	protected function toJson($arg) {
		return json_encode($arg, 256);
	}

	protected function cleanInput($input) {
		if(is_array($input)) {
			foreach($input as $key => $value) {
				$input[$key] = $this->cleanInput($value);
			}
		}
		else {
			$input = trim($input);
			$input = stripslashes($input);
			$input = htmlspecialchars($input);
		}

		return $input;
	}
}