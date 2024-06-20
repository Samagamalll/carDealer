function printError(Id, Msg) {
    document.getElementById(Id).innerHTML = Msg;
}

function validateForm() {
    var email = document.Form.email.value;
    var password = document.Form.password.value;


    var isValid = true;

    if (email == "") {
        printError("emailErr", "Please enter your email address");
        var elem = document.getElementById("email");
        elem.classList.add("input-2");
        elem.classList.remove("input-1");
        isValid = false;
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
            var elem = document.getElementById("email");
            elem.classList.add("input-2");
            elem.classList.remove("input-1");
            isValid = false;
        } else {
            printError("emailErr", "");
            var elem = document.getElementById("email");
            elem.classList.add("input-1");
            elem.classList.remove("input-2");
        }
    }

    if (password == "") {
        printError("passwordErr", "Please enter your password");
        var elem = document.getElementById("password");
        elem.classList.add("input-2");
        elem.classList.remove("input-1");
        isValid = false;
    } else {
        printError("passwordErr", "");
        var elem = document.getElementById("password");
        elem.classList.add("input-1");
        elem.classList.remove("input-2");
    }

    return isValid;
};