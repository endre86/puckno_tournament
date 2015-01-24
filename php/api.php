<?php

session_start();
error_reporting(-1);

$_SESSION['user'] = true; // TODO: DEBUG => REMOVE



/**
 * Simple API for handling requests.
 */
class API {
	private $controller;

	public function processApi() {
		$request = explode('/', array_keys($_REQUEST)[0]);
		$controller = ucfirst(strtolower($request[0])) . 'Controller';
		$method = $request[1];

		if(!file_exists($controller . '.php')) {
			echo 'No such controller: ' . $controller;
			$this->send404AndExit();
		}

		require_once($controller . '.php');
		$controller = new $controller($this);

		$requestMethod = $_SERVER['REQUEST_METHOD'];
		if(!method_exists($controller, $method)) {
			echo 'No such method: ' . get_class($controller) . '->' . $method;
			$this->send404AndExit();
		}

		switch($requestMethod) {
			case 'GET':
				$this->execute($controller, $method);
				break;
			case 'POST':
				$data = file_get_contents("php://input");
  				$data = json_decode($data, TRUE);
				$this->execute($controller, $method, $data);
				break;
			default:
				$this->send404AndExit();
				break;
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

	private function mapInputToParameters($controller, $function, $input) {
		$params = array();

		$reflectionMethod = new ReflectionMethod($controller, $function);
		foreach($reflectionMethod->getParameters() as $parameter) {
			if(array_key_exists($parameter->name, $input)) {
				array_push($params, $input[$parameter->name]);
			}
			else {
				array_push($params, null);
			}
		}

		return $params;
	}

	private function execute($controller, $function, $data = null) {
		//header('Content-Type: application/json: charset=utf-8');
		if(is_array($data)) {
			$params = $this->mapInputToParameters($controller, $function, $data);
			echo call_user_func_array(array($controller, $function), $params);
		}
		else {
			echo call_user_func(array($controller, $function));
		}
	}
}

$api = new API();
$api->processApi();