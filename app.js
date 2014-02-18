var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());

//default route
app.get("/", function(req, res) {
	res.send("Hello, Express!");
});

app.get("/hi", function(req, res) {
	var message = [
		"<h1>Hello, Express</h1>",
		"<p>Welcome to the Golden Nugget!</p>"].join("\n");
	res.send(message);
});

// app.get("/users/:userId", function(req, res) {
// 	res.send("<h1>Hello, User #" + req.params.userId + "!");
// });

app.post("/users", function(req, res) {
	res.send("Creating a new user with the name " + req.body.username + ".");
});
// app.get("/users/:userId", function(req, res) {
app.get(/\/users\/(\d*)\/?(edit)?/, function(req, res) {
	// /users/10
	// /users/10/
	// /users/10/edit
	var message = "user #" + req.params[0] + "'s profile";
	if(req.params[1] === 'edit') {
		message = "Editing " + message;
	} else {
		message = "Viewing " + message;
	}
	res.send(message);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});