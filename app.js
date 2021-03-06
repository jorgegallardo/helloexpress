var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('view cache', true); or app.enable("view cache");

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

//default route
app.get("/", function(req, res) {
	res.render("home", {title:"Having Fun With Express; something else"});
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
//app.put /users/:userId
//app.delete /users/:userId

// app.get("/users/:userId", function(req, res) {
app.get(/\/users\/(\d*)\/?(edit)?/, function(req, res) {
	// this can accept these different routes:
	// /users/10
	// /users/10/
	// /users/10/edit
	// looks like the ? means things are optional
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