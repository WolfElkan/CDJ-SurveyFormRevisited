// $(document).ready(function() {
// 	console.log('script running')

// 	$('#survey').submit(function() {
// 		var data = {
// 			name: $('#name').value,
// 			location: $('#location').value,
// 			language: $('#language').value,
// 			comment: $('#comment').value 
// 		}
// 		$('#name').value = '';
// 		$('#comment').value = '';
// 		socket.emit("posting_form",data);
// 		return false;
// 	})

// 	socket.on('updated_message',function() {

// 	})

// });

function object2string(obj) {
	var str = '{ ';
	var flag = false;
	for (var key in obj){
		if (flag) {
			str += ', ';
		}
		flag = true;
		str += key;
		str += ': "';
		str += obj[key];
		str += '"';
	}
	str += '}';
	return str;
}


$(document).ready(function(){
	console.log('connected');

	var socket = io.connect();

	$('#newuser').submit(function(){
		console.log('submit')
		var data = {
			name: $('#name').val(),
			location: $('#location').val(),
			language: $('#language').val(),
			comment: $('#comment').val() 
		}
		$('#name').value = '';
		$('#comment').value = '';

		var emit_name = "posting_form";
		socket.emit(emit_name, data);
		console.log('Emission:',emit_name,data);
		return false;
	});
	socket.on("server_response", function(data){
		var dojos = {
			'sea':'Seattle',
			'svl':'Silicon Valley',
			'lax':'Los Angeles',
			'dal':'Dallas',
			'wdc':'Washington D.C.',
			'chi':'Chicago'
		}
		data.location = dojos[data.location];

		$('#results').removeClass('hidden');
		$('#results').addClass('greenbox');
		$('#message').html('You emitted the following information to the server: '+object2string(data));
		console.log('The server says:',data)
	})

	socket.on("random_number", function(data) {
		$('#results').removeClass('hidden');
		$('#results').addClass('greenbox');
		console.log('Lucky:',data)
		$('#lucky_number').html('Your lucky number emitted by the server is '+data);
	})
	
})


























