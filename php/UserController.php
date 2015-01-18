<?php
require('AbstractController.php');

class UserController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function post($user) {
		parent::verifyIsAdminOrExit();

		$hashedpw = password_hash($user['password'], PASSWORD_DEFAULT);
		$res = parent::getDBHandler()->createUser($user['username'], $hashedpw);
		return parent::createResponseJSONObject($res);
	}
}