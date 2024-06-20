function validateForm() {
    // Clear previous error messages
    document.querySelectorAll('.error').forEach(element => element.textContent = '');

    let isValid = true;

    // Validate Billing Address
    if (document.getElementById('fullName').value.trim() === '') {
        document.getElementById('fullNameError').textContent = 'Full name is required';
        isValid = false;
    }
    if (document.getElementById('email').value.trim() === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    }
    if (document.getElementById('address').value.trim() === '') {
        document.getElementById('addressError').textContent = 'Address is required';
        isValid = false;
    }
    if (document.getElementById('city').value.trim() === '') {
        document.getElementById('cityError').textContent = 'City is required';
        isValid = false;
    }
    if (document.getElementById('state').value.trim() === '') {
        document.getElementById('stateError').textContent = 'State is required';
        isValid = false;
    }
    if (document.getElementById('zipCode').value.trim() === '') {
        document.getElementById('zipCodeError').textContent = 'Zip code is required';
        isValid = false;
    }

    // Validate Payment Details
    if (document.getElementById('cardName').value.trim() === '') {
        document.getElementById('cardNameError').textContent = 'Name on card is required';
        isValid = false;
    }
    if (document.getElementById('cardNumber').value.trim() === '' || document.getElementById('cardNumber').value.length !== 16) {
        document.getElementById('cardNumberError').textContent = 'Valid credit card number is required';
        isValid = false;
    }
    if (document.getElementById('expMonth').value.trim() === '') {
        document.getElementById('expMonthError').textContent = 'Expiration month is required';
        isValid = false;
    }
    if (document.getElementById('expYear').value.trim() === '') {
        document.getElementById('expYearError').textContent = 'Expiration year is required';
        isValid = false;
    }
    if (document.getElementById('cvv').value.trim() === '' || document.getElementById('cvv').value.length < 3 || document.getElementById('cvv').value.length > 4) {
        document.getElementById('cvvError').textContent = 'Valid CVV is required';
        isValid = false;
    }

    return isValid;
}