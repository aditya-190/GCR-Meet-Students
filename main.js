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

$('.minusButton').click(function() {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Removed Successfully."
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
});

$('.plusButton').click(function() {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Added Successfully."
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
});

$(document.getElementById("googleMeet")).click(function() {
});

$(document.getElementById("googleClassroom")).click(function() {
});

function ValidURL(str) {
    const regex = /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%\-\/]))?/;
    return regex.test(str);
}