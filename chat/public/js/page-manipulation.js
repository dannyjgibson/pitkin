var options = {
	backdrop: 'true',
	keyboard: 'true',
	show: 'true'
};

var settingsModal = $('#settings-modal');

$(document).ready(function(){	

	settingsModal.modal(options);
	
	settingsModal.on('shown.bs.modal', function () {
		$('').focus();
	});
});

$('#settings').click( function(){
  console.log('clicked settings');
  settingsModal.modal('toggle');
});
