<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta name="google-signin-client_id" content="728937269612-683ln5bl92ddn23j6llho2hj7o2fa7bs.apps.googleusercontent.com">
	<meta charset="ISO-8859-1">
	<script src="https://apis.google.com/js/platform.js" async defer> </script>
	<title>Welcome!</title>
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="googleStyle.css">
</head>
<body>
	<div class = "gameChar">
		<img src = "sample.png">
	</div>
	<div class = "welcome">
		<h1>Welcome!</h1>
		<h3>Please sign-in using your Google account!</h3>
	</div>
	<div class="center">
		<div class="g-signin2" data-onsuccess="onSignIn"></div>
	</div>
</body>
	<script>
		function onSignIn(googleUser){
			window.location = "gamePage.jsp"; //replace this with name of game page
		}
	</script>
</html>