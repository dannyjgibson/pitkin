var config = require('./config'),
		mongoose = require('mongoose'),
		superagent = require('superagent');

var options = {
	backdrop: 'true',
	keyboard: 'true',
	show: 'true'
};

// read/write chatroom data to db
mongoose.connect(config.database.test);
console.log('connected to mongodb at ' + config.database.test);

var settingsModal = $('#settings-modal');

$(document).ready(function () {	

	settingsModal.modal(options);
	
	settingsModal.on('shown.bs.modal', function () {
		$('').focus();
	});
});

$('#settings').click( function () {
  settingsModal.modal('toggle');
});
