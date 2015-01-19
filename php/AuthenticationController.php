<?php
require('AbstractController.php');

class AuthenticationController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function login($credentials) {
		parent::verifyIsUserOrExit();

		$pw = parent::getDBHandler()->getHashedPasswordFor($credentials['username']);

		if(password_verify($credentials['password'], $pw)) {
			$_SESSION[parent::ADMIN] = true;
			return parent::createSuccessJSONObject();
		}

		return parent::createErrorJSONObject('Bad username / password combination');
	}

	public function logout() {
		parent::verifyIsAdminOrExit();

		unset($_SESSION[parent::ADMIN]);
		return parent::createSuccessJSONObject();
	}
}