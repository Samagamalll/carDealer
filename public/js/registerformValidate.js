function printError(Id, Msg) {
    document.getElementById(Id).innerHTML = Msg;
}


function validateForm() {
    var name = document.Form.name.value;
    var email = document.Form.email.value;
    var mobile = document.Form.mobile.value;
    var gender = document.Form.gender.value;
    var password = document.Form.password.value;

    var isValid = true;

    // Validate name
    if (name === "") {
        printError("nameErr", "Please enter your name");
        document.getElementById("name").classList.add("input-2");
        document.getElementById("name").classList.remove("input-1");
        isValid = false;
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
            document.getElementById("name").classList.add("input-2");
            document.getElementById("name").classList.remove("input-1");
            isValid = false;
        } else {
            printError("nameErr", "");
            document.getElementById("name").classList.add("input-1");
            document.getElementById("name").classList.remove("input-2");
        }
    }

    // Validate email
    if (email === "") {
        printError("emailErr", "Please enter your email address");
        document.getElementById("email").classList.add("input-2");
        document.getElementById("email").classList.remove("input-1");
        isValid = false;
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
            document.getElementById("email").classList.add("input-2");
            document.getElementById("email").classList.remove("input-1");
            isValid = false;
        } else {
            printError("emailErr", "");
            document.getElementById("email").classList.add("input-1");
            document.getElementById("email").classList.remove("input-2");
        }
    }

    // Validate password
    if (password === "") {
        printError("passwordErr", "Please enter your password");
        document.getElementById("password").classList.add("input-2");
        document.getElementById("password").classList.remove("input-1");
        isValid = false;
    } else {
        var regex = /^.{1,}$/;
        if (regex.test(password) === false) {
            printError("passwordErr", "Password should be at least 8 characters long");
            document.getElementById("password").classList.add("input-2");
            document.getElementById("password").classList.remove("input-1");
            isValid = false;
        } else {
            printError("passwordErr", "");
            document.getElementById("password").classList.add("input-1");
            document.getElementById("password").classList.remove("input-2");
        }
    }

    // Validate mobile number
    if (mobile === "") {
        printError("mobileErr", "Please enter your mobile number");
        document.getElementById("mobile").classList.add("input-2");
        document.getElementById("mobile").classList.remove("input-1");
        isValid = false;
    } else {
        var regex = /^[0-9]{11}$/;
        if (regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid 11 digit mobile number");
            document.getElementById("mobile").classList.add("input-2");
            document.getElementById("mobile").classList.remove("input-1");
            isValid = false;
        } else {
            printError("mobileErr", "");
            document.getElementById("mobile").classList.add("input-1");
            document.getElementById("mobile").classList.remove("input-2");
        }
    }

    // Validate gender
    if (gender === "") {
        printError("genderErr", "Please select your gender");
        document.getElementById("gender").classList.add("input-4");
        document.getElementById("gender").classList.remove("input-3");
        isValid = false;
    } else {
        printError("genderErr", "");
        document.getElementById("gender").classList.add("input-3");
        document.getElementById("gender").classList.remove("input-4");
    }

    console.log(isValid);
    return isValid;
};
