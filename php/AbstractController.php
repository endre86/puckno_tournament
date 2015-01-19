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
			$this->api->send403AndExit();
		}
	}

	protected function verifyIsAdminOrExit() {
		if(!isset($_SESSION[$this::ADMIN])) {
			$this->api->send403AndExit();
		}
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
		return json_encode($arg, JSON_UNESCAPED_UNICODE);
	}
}