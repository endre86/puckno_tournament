<?php

class REST {
	const OK = 200;
	const CREATED = 201;
	const NO_CONTENT = 204;
	const FORBIDDEN = 403;
	const NOT_FOUND = 404;

	protected function respond200($data) {
		$this->respond(OK, 'OK', 'application/json', $data);
	}

	protected function respond201() {
		$this->respond(CREATED, 'Created', 'text/plain');
	}

	protected function respond204() {
		$this->respond(NO_CONTENT, 'No Content', 'text/plain');
	}

	protected function respond403() {
		$this->respond(FORBIDDEN, 'Forbidden', 'text/plain');
	} 

	protected function respond404() {
		$this->respond(NOT_FOUND, 'Not Found', 'text/plain');
	}

	protected function respond($code, $status, $contentType, $status) {
		header('HTTP/1.1 ' . $code . ' ' . $status);
		header('Content-Type:' . $contentType . '; charset=utf-8');
		
		ob_implicit_flush();

		if(isset($data)) {
			echo $data;
		}
	    ob_flush();
	    flush();
	    sleep(1);
	}
}