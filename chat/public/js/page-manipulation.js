// use XMLHTTPrequest, not the nodemodules

var options = {
	backdrop: 'true',
	keyboard: 'true',
	show: 'true'
};

var settingsModal = $('#settings-modal');

$(document).ready(function () {	

	settingsModal.modal(options);
	
	settingsModal.on('shown.bs.modal', function () {
		$('').focus();
	});
});

$('#settings').click(function () {
  settingsModal.modal('toggle');
});

$('#save-button').click(function () {
  var username = $('#username').value(),
      namespace = $('#namespace').value;
  
  $.post(config, {
    namespaceId: namespace,
    users: username
  });
});
