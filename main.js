// Code Handling DropBox Select Options - Starts.

$('.selectedContainer').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('expanded');
    $('#'+$(e.target).attr('for')).prop('checked',true);
});
$(document).click(function() {
    $('.selectedContainer').removeClass('expanded');
});

// Code Handling DropBox Select Options - Ends.