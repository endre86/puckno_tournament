<?php

session_start();
$_SESSION['user'] = true;

/**
 * Simple API for handling requests.
 */
class API {
	private $controller; 

	public function processApi() {
		if(!isset($_SESSION['user']) && 
		   !isset($_SESSION['admin'])) {

			header('HTTP/1.1 403 Forbidden');
			exit();
		}

		$request = split('/', array_keys($_REQUEST)[0]);
		$controller = ucfirst(strtolower($request[0])) . 'Controller';
		$function = strtolower($request[1]);

		if(!file_exists($controller . '.php')) {
			header('HTTP/1.1 404 Not Found');
			exit();
		}

		require_once($controller . '.php');
		$controller = new $controller;

		if(!method_exists($controller, $function)) {
			header('HTTP/1.1 404 Not Found');
			exit();
		}

		switch($_SERVER['REQUEST_METHOD']) {
			case 'GET':
				$this->get($controller, $function, $request);
				break;
			case 'POST':
				$this->post($controller, $function);
		}
	}

	private function get($controller, $function, $request) {
		echo call_user_func_array(
			array($controller, $function), array_slice($request, 2));
	}

	private function post($controller, $function) {
		// TODO
	}
}

$api = new API();
$api->processApi();