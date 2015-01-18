<?php

session_start();

$_SESSION['user'] = true; // TODO: DEBUG => REMOVE
/**
 * Simple API for handling requests.
 */
class API {
	private $controller;

	public function processApi() {
		$request = split('/', array_keys($_REQUEST)[0]);
		$controller = ucfirst(strtolower($request[0])) . 'Controller';

		if(!file_exists($controller . '.php')) {
			$this->send404AndExit();
		}

		require_once($controller . '.php');
		$controller = new $controller($this);

		$requestMethod = $_SERVER['REQUEST_METHOD'];
		if(!method_exists($controller, strtolower($requestMethod))) {
			$this->send404AndExit();
		}

		switch($requestMethod) {
			case 'GET':
				$data = array_slice($request, 1);
				$this->execute($controller, strtolower($requestMethod), $data);
				break;
			case 'POST':
				$this->execute($controller, strtolower($requestMethod), $_POST);
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
		// header('Content-Type: application/json: charset=utf-8');
		$res = call_user_func_array(
			array($controller, $function), $data);
		echo $res;
	}
}

$api = new API();
$api->processApi();