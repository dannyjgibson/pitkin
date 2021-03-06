$(document).ready(function () {
  $('#search-by-tags').click(function (argument) {
    $('.article').not('.dontDisplay').show();
    var searchTags = $('#search-tags').val().split(' ');
    if (searchTags.indexOf('') === -1) {
      $('.article').each(function (index) {
        var articleTags = [];
        $(this).find('.tag').each(function (index) {
          articleTags.push($(this).text());
        });
        var searchTagsPresent = false;
        for (var i = 0; i < searchTags.length; i++) {
          if (articleTags.indexOf(searchTags[i]) === -1){
            searchTagsPresent = false;
            break;
          } else {
            searchTagsPresent = true;
          }
        }
        if (!searchTagsPresent) {
          $(this).hide();
        }
      });
    } else {
      $('.article').not('.dontDisplay').show();
    }
  });
});
