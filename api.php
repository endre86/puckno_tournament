<?php

session_start();
error_reporting(-1);

$_SESSION['user'] = true; // TODO: DEBUG => REMOVE

//require_once('lib/KLogger.php');

/**
 * Simple API for handling requests.
 */
class API {
	private $logger;
	private $controller;

	public function __construct() {
		// $this->logger = new KLogger('../Log/' . date('Y-m-d') . '.log', KLogger::DEBUG);
	}

	public function processApi() {
		$request = array_keys($_REQUEST);
		$request = explode('/', $request[0]);

		$controller = ucfirst(strtolower($request[0])) . 'Controller';
		$method = $request[1];

		if(!file_exists($controller . '.php')) {
			// $this->logger->error('API: No such controller: ' . $controller);
			echo 'No such controller: ' . $controller;
			$this->send404AndExit();
		}

		require_once($controller . '.php');
		$controller = new $controller($this, $this->logger);

		$requestMethod = $_SERVER['REQUEST_METHOD'];
		if(!method_exists($controller, $method)) {
			// $this->logger->error('API: No such method: ' . get_class($controller) . '->' . $method);
			echo 'No such method: ' . get_class($controller) . '->' . $method;
			$this->send404AndExit();
		}

		switch($requestMethod) {
			case 'GET':
				// $this->logger->debug('API: Handeling GET ' . get_class($controller) . '->' . $method);
				return $this->execute($controller, $method);
				break;
			case 'POST':
				// $this->logger->debug('API: Handeling POST ' . get_class($controller) . '->' . $method);
				$data = file_get_contents("php://input");
  				$data = json_decode($data, TRUE);
				return $this->execute($controller, $method, $data);
				break;
			default:
				// $this->logger->info('API: Unhandled request method ' . $requestMethod . ' for ' . get_class($controller) . '->' . $method);
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

	public function send420AndExit() {
		header('HTTP/1.1 420 Method Failure');
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
