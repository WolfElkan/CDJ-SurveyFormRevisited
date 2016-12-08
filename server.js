var express = require('express');
var path = require('path');
var BodyParser = require('body-parser');
var app = express();
app.use(express.static(path.join(__dirname,'./static')));
app.use(BodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.get('/',function(request,response) {
	response.render('index')
})

var port = 5000;
var server = app.listen(port, function(){
	console.log('Express app live at LOCALHOST Port',port);
})

var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket) {
	console.log('Connected on socket',socket.id);

	socket.on("posting_form",function(data){
		console.log('Form Recieved');
		console.log('Data:',data)

		var emit_name = "server_response";
		socket.emit(emit_name, data);
		console.log('Emission1:',emit_name,data);

		var lucky = Math.floor(Math.random()*1000)+1;

		var emit_name = "random_number";
		socket.emit(emit_name,lucky);
		console.log('Emission2:',emit_name,lucky);

	})
})