<?php
	session_start();
	$_SESSION['user'] = true;
?>

<html ng-app="PucknoTournament">
	<head>
		<meta charset="utf-8">
		<link rel="author" href="humans.txt" />
		<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" href="bower_components/trumbowyg/dist/ui/trumbowyg.min.css">
		<link href="css/stylesheet.css" rel="stylesheet">

		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.0rc3/angular.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.0rc3/angular-route.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.0rc3/angular-resource.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js"></script>

		<script type="text/javascript" src="bower_components/trumbowyg/dist/trumbowyg.min.js"></script>
		
		<script style="text/javascript" src="js/app.js"></script>
		<script style="text/javascript" src="js/router.js"></script>
		<script style="text/javascript" src="js/utils.js"></script>
		<script style="text/javascript" src="js/constants.js"></script>
		<script style="text/javascript" src="js/controllers.js"></script>
		<script style="text/javascript" src="js/admincontrollers.js"></script>
		<script style="text/javascript" src="js/services/logger.js"></script>
		<script style="text/javascript" src="js/services/tournament.js"></script>
		<script style="text/javascript" src="js/services/players.js"></script>
		<script style="text/javascript" src="js/services/teams.js"></script>
		<script style="text/javascript" src="js/services/ithfplayers.js"></script>
		<script style="text/javascript" src="js/services/auth.js"></script>
		<script style="text/javascript" src="js/filters.js"></script>
	</head>

	<body ng-app="PucknoTournament"><br/>		
	<div class="row">
			<div class="col-md-6 col-md-offset-3" ui-view></div>
			<div class="col-md-6 col-md-offset-3">
			<p class="pull-right"><a href="#/admin/login">Administrer</a>
			</div>
		</div>
	</body>
</html>