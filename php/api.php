<?php

session_start();

/**
 * Simple API for handling requests.
 */
class API {
	private $controller; 

	public function processApi() {
		$request = split('/', array_keys($_REQUEST)[0]);
		$controller = ucfirst(strtolower($request[0])) . 'Controller';
		$function = strtolower($request[1]);

		if(!file_exists($controller . '.php')) {
			$this->send404AndExit();
		}

		require_once($controller . '.php');
		$controller = new $controller($this);

		if(!method_exists($controller, $function)) {
			$this->send404AndExit();
		}

		switch($_SERVER['REQUEST_METHOD']) {
			case 'GET':
				$data = array_slice($request, 2);
				$this->execute($controller, $function, $data);
				break;
			case 'POST':
				$this->execute($controller, $function, $_POST);
		}
	}

	public function send403AndExit() {
		header('HTTP/1.1 403 Forbidden');
		exit();
	}

	public function send404AndExit() {
		header('HTTP/1.1 404 Not Found');
		exit();
	}

	private function execute($controller, $function, $data) {
		echo call_user_func_array(
			array($controller, $function), $data);
	}
}

$api = new API();
$api->processApi();