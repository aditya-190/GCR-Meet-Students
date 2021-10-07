const currentSelectedClass = {
    "className": "None",
    "meetLink": "",
    "classroomLink": "",
};

// Automatically Called Function - Starts.
let arr = document.querySelectorAll(".formInput");
let data;
for (let i = 0; i < 3; i++) {
    data = localStorage.getItem(`input${i}`);
    if (data) {
        arr[i].value = data;
    }
}

for (let i = 0; i < 3; i++) {
    arr[i].addEventListener("change", () => {
        localStorage.setItem(`input${i}`, arr[i].value);
    })
}
updateList();
// Automatically Called Function - Ends.

// Helper Functions - Starts.
function isURLValid(url) {
    const regex = /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%\-\/]))?/;
    return regex.test(url);
}

function isInputValid(classNameExtract, meetLinkExtract, classroomLinkExtract) {
    if (!isURLValid(meetLinkExtract)) {
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

    if (!isURLValid(classroomLinkExtract)) {
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
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = message;
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

function updateList() {
    let obj = localStorage.getItem("data");
    if (obj != null) {
        obj = JSON.parse(obj);
    } else {
        obj = [];
    }

    const classes = document.getElementById("selectedContainer");
    let html = '';
    let singleData;
    html += `<input type="radio" class="teacherName" name="teacherName" value="None"
           id="None" checked><label for="teacherName">None</label>`

    let indexCounter = 0;
    obj.forEach(function (element) {
        singleData = `<input type="radio" class="teacherName" name="teacherName" value="${element.className}" id="google_meets_students_${indexCounter}"><label
                for="google_meets_students_${indexCounter}">${element.className}</label>`
        html += singleData;
        indexCounter += 1;
    })
    classes.innerHTML = html;
}

function setLocalStorageItems(obj) {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data == null) {
        data = [];
    }
    data.push(obj);
    localStorage.setItem("data", JSON.stringify(data));
    updateList();

    for (let i = 0; i < 3; i++) {
        localStorage.removeItem(`input${i}`);
    }
}

function removeLocalStorageItem() {
    let index = currentSelectedClass.className;

    if (index !== "None") {
        let data = localStorage.getItem("data");
        if (data != null) {
            data = JSON.parse(data);
        } else {
            data = [];
        }

        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
        updateList();
        showToast("Removed Successfully.");
        currentSelectedClass.className = "None";
        currentSelectedClass.meetLink = "";
        currentSelectedClass.classroomLink = "";
    } else {
        showToast("Class Not Selected.");
    }
}

// Helper Functions - Ends.


// Remove from List Button.
$('.minusButton').click(function () {
    removeLocalStorageItem();
});

// Add To List Button.
$('.plusButton').click(function () {
    const classNameExtract = document.getElementById("className").value;
    const meetLinkExtract = document.getElementById("meetLink").value;
    const classroomLinkExtract = document.getElementById("classroomLink").value;

    if (isInputValid(classNameExtract, meetLinkExtract, classroomLinkExtract)) {
        let singleContent = {
            "className": classNameExtract,
            "meetLink": meetLinkExtract,
            "classroomLink": classroomLinkExtract,
        }
        setLocalStorageItems(singleContent);
        document.getElementById("className").value = "";
        document.getElementById("meetLink").value = "";
        document.getElementById("classroomLink").value = "";
        showToast("Added Successfully.");
    }
});

// Google Meet Button.
$(document.getElementById("googleMeet")).click(function () {
    if (isURLValid(currentSelectedClass.meetLink)) {
        chrome.tabs.create({active: true, url: currentSelectedClass.meetLink}).then();
    } else {
        showToast("Please Select Class.");
    }
});

// Google ClassRoom Button.
$(document.getElementById("googleClassroom")).click(function () {
    if (isURLValid(currentSelectedClass.classroomLink)) {
        chrome.tabs.create({active: true, url: currentSelectedClass.classroomLink}).then();
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

    let index = selection[0].id.replace(/^\D+/g, '');
    let data = localStorage.getItem("data");
    if (data != null) {
        data = JSON.parse(data);
    } else {
        data = [];
    }
    currentSelectedClass.className = data[index].className;
    currentSelectedClass.meetLink = data[index].meetLink;
    currentSelectedClass.classroomLink = data[index].classroomLink;
});

$(document).click(function () {
    $('.selectedContainer').removeClass('expanded');
});
