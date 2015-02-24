<!DOCTYPE>
<html ng-app>
	<head>
		<title>Tools Directory</title>
		<link rel="stylesheet" type="text/css" href="foundation/css/foundation.min.css">
		<link rel="stylesheet" type="text/css" href="foundation/foundation_icons_social/stylesheets/social_foundicons.css">
		<link rel="stylesheet" type="text/css" href="src/css/main.css">
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="foundation/js/foundation.min.js"></script>
	</head>
	<body>
		<script type="text/javascript">
			var tools = {{ $tools }};
			var authUser = {{ Auth::user() }}
		</script>
		<script type="text/javascript" src="src/js/main.js"></script>
	</body>
</html>
