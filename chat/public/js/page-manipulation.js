var options = {
	backdrop: 'true',
	keyboard: 'true',
	show: 'true'
};

$(document).ready(function(){	
	var settingsModal = $('#settings-modal');

	settingsModal.modal(options);
	
	settingsModal.on('shown.bs.modal', function () {
		$('').focus();
	});
});