<?php
require('AbstractController.php');

class AuthenticationController extends AbstractController {

	public function __construct($api) {
		parent::__construct($api);
	}

	public function login($username, $password) {
		parent::verifyIsUserOrExit();

		$pw = parent::getDBHandler()->getHashedPasswordFor($username);

		if(password_verify($password, $pw)) {
			$_SESSION[parent::ADMIN] = true;
			$_SESSION[parent::SESSION_USERNAME] = $username;
			$this->logger->info('AuthenticationController: Successfully logged in user ' . $username);
			return parent::createSuccessJSONObject();
		}

		$this->logger->info('AuthenticationController: Failed login attempt for ' . $username);
		return parent::createErrorJSONObject('Bad username / password combination');
	}

	public function logout() {
		parent::verifyIsAdminOrExit();

		$this->logger->debug('AuthenticationController: Logout called for ' . $_SESSION[parent::SESSION_USERNAME]);
		unset($_SESSION[parent::ADMIN]);
		unset($_SESSION[parent::SESSION_USERNAME]);
		return parent::createSuccessJSONObject();
	}
}