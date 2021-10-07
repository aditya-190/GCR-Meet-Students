// Code Handling DropBox Select Options - Starts.

$('.selectedContainer').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('expanded');
    $('#' + $(e.target).attr('for')).prop('checked', true);
});
$(document).click(function () {
    $('.selectedContainer').removeClass('expanded');
});

// Code Handling DropBox Select Options - Ends.

function ValidURL(str) {
    const regex = /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%\-\/]))?/;
    return regex.test(str);
}

$('.minusButton').click(function () {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Removed Successfully."
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
});

$('.plusButton').click(function () {
    const classNameExtract = document.getElementById("className").value;
    const meetLinkExtract = document.getElementById("meetLink").value;
    const classroomLinkExtract = document.getElementById("classroomLink").value;

    if (!ValidURL(meetLinkExtract)) {
        document.querySelector("#meetContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#meetContainer").style.border = "";
        }, 2000);

        return;
    }

    if (classNameExtract === "") {
        document.querySelector("#classNameContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#classNameContainer").style.border = "";
        }, 2000);

        return;
    }

    if (!ValidURL(classroomLinkExtract)) {
        document.querySelector("#classRoomContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#classRoomContainer").style.border = "";
        }, 2000);

        return;
    }

    let singleContent = {
        "className": classNameExtract,
        "meetLink": meetLinkExtract,
        "classroomLink": classroomLinkExtract,
    }

    document.getElementById("className").value = "";
    document.getElementById("meetLink").value = "";
    document.getElementById("classroomLink").value = "";

    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = "Added Successfully."
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
});

$(document.getElementById("googleMeet")).click(function () {
});

$(document.getElementById("googleClassroom")).click(function () {
});