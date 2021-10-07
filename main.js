// Global Variables.
const snackbar = document.getElementById("snackbar");
const classNameExtract = document.getElementById("className").value;
const meetLinkExtract = document.getElementById("meetLink").value;
const classroomLinkExtract = document.getElementById("classroomLink").value;
const currentSelectedClass = {
    "className": "None",
    "meetLink": "",
    "classroomLink": "",
};

// Helper Functions - Starts.
function ValidURL(str) {
    const regex = /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%\-\/]))?/;
    return regex.test(str);
}

function isInputValid() {
    if (!ValidURL(meetLinkExtract)) {
        document.querySelector("#meetContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#meetContainer").style.border = "";
        }, 2000);
        showToast("Enter Valid Meet Link.");
        return false;
    }

    if (classNameExtract === "") {
        document.querySelector("#classNameContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#classNameContainer").style.border = "";
        }, 2000);
        showToast("Enter Class Name.");
        return false;
    }

    if (!ValidURL(classroomLinkExtract)) {
        document.querySelector("#classRoomContainer").style.border = "1px solid #FF5C58";
        setTimeout(() => {
            document.querySelector("#classRoomContainer").style.border = "";
        }, 2000);
        showToast("Enter Valid ClassRoom Link.");
        return false;
    }
    return true;
}

function showToast(message) {
    snackbar.className = "show";
    snackbar.innerText = message;
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

function getLocalStorageItems() {

}

function setLocalStorageItems(obj) {
    chrome.storage.local.set({data: obj}, function () {
        document.getElementById("className").value = "";
        document.getElementById("meetLink").value = "";
        document.getElementById("classroomLink").value = "";
        showToast("Added Successfully.");
    });
}

function removeLocalStorageItem() {
    chrome.storage.local.remove(currentSelectedClass.className, function () {
        showToast("Removed Successfully.");
    });
}

// Helper Functions - Ends.


// Remove from List Button.
$('.minusButton').click(function () {
    removeLocalStorageItem();
});

// Add To List Button.
$('.plusButton').click(function () {
    if (isInputValid()) {
        let singleContent = {
            "className": classNameExtract,
            "meetLink": meetLinkExtract,
            "classroomLink": classroomLinkExtract,
        }
        setLocalStorageItems(singleContent);
    }
});

// Google Meet Button.
$(document.getElementById("googleMeet")).click(function () {
    if (ValidURL(currentSelectedClass.meetLink)) {
        chrome.tabs.create({active: true, url: currentSelectedClass.meetLink});
    } else {
        showToast("Please Select Class.");
    }
});

// Google ClassRoom Button.
$(document.getElementById("googleClassroom")).click(function () {
    if (ValidURL(currentSelectedClass.classroomLink)) {
        chrome.tabs.create({active: true, url: currentSelectedClass.classroomLink});
    } else {
        showToast("Please Select Class.");
    }
});

// DropDown List Selection Handler.
$('.selectedContainer').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('expanded');
    const selection = $('#' + $(e.target).attr('for'))
    selection.prop('checked', true);

    currentSelectedClass.className = selection.val();
    // TODO: Retrieve Data using Key - Class Name.
});

$(document).click(function () {
    $('.selectedContainer').removeClass('expanded');
});
