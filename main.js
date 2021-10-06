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

$('.minusButton').click(function(e) {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Removed Successfully."
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
});

$('.plusButton').click(function(e) {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Added Successfully."
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
});