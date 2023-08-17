let theUserType = "student"

let isSubmitting = false; // Flag to track if the form is being submitted
function isValidEmail(email) {
    // Regular expression to validate email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    // Regular expression to validate phone number (simplified)
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
}



const inputs = document.getElementsByTagName("input");
const errorMessage = document.getElementById("error-message");
const validationIcon = document.querySelectorAll(".validation-icon");


for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const mark = validationIcon[i];
    checkValid(input, mark);

}

function checkValid(input, mark) {
    input.addEventListener("input", function () {
        document.querySelector("button[type='submit']").innerHTML = 'Join us'
        const inputType = input.id;
        const inputValue = input.value;
        let isValidInput = false;

        if (inputType === "email-phone") {
            isValidInput = isValidEmail(inputValue) || isValidPhoneNumber(inputValue);
        } else if (inputType === "name") {
            isValidInput = inputValue.length >= 5;
        }

        if (isValidInput) {
            mark.classList.add("valid");
        } else {
            mark.classList.remove("valid");
        }
    });
}


document.getElementById("subscribe-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // If the form is already submitting, return and prevent multiple submissions
    if (isSubmitting) {
        return;
    }

    // Set the flag to indicate the form is being submitted
    isSubmitting = true;

    const name = document.getElementById("name").value;
    const email_phone = document.getElementById("email-phone").value;

    let isValidInput = false;
    if ((isValidEmail(email_phone) || isValidPhoneNumber(email_phone)) && name.length >= 5) {
        isValidInput = true;
    }

    const errorMessage = document.getElementById("error-message");
    const email_phone_field = document.getElementById("email-phone");

    if (!isValidInput) {
        if (name.length >= 5) {
            errorMessage.innerHTML = "Please enter a valid email or phone number.";
            errorMessage.style.display = "block";
            email_phone_field.style.borderColor = "red"
        } else {
            errorMessage.innerHTML = "Please enter a valid name.";
            errorMessage.style.display = "block"; // Show error message
        }
        isSubmitting = false; // Reset flag
        return;
    }
    errorMessage.style.display = "none"; // Hide error message
    email_phone_field.style.borderColor = "#ffffff00"

    let formData = {};
    if (isValidEmail(email_phone)) {
        formData = {
            role: theUserType,
            name: name,
            email: email_phone
        };
    } else if (isValidPhoneNumber(email_phone)) {
        formData = {
            role: theUserType,
            name: name,
            phoneNumber: email_phone
        };
    } else {
        alert("Please enter a valid email address or phone number.");
        isSubmitting = false; // Reset flag
        return;
    }

    // Disable the submit button
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loader"></div>';

    // Send data to the API endpoint
    fetch("https://alostaz-server.onrender.com/api/subscribers/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data submitted:", data);
            if (data.error) {
                errorMessage.innerHTML = data.error
                errorMessage.style.display = "block"
                submitButton.innerHTML = 'Join us';

            } else {
                const successPopup = document.getElementById("success-popup");
                const closePopupButton = document.getElementById("close-popup-button");
                
                successPopup.style.display = "flex";
                closePopupButton.addEventListener("click", function () {
                    successPopup.style.display = "none"; // Hide the popup
                });
                submitButton.disabled = false; // Enable the submit button
                submitButton.innerHTML = "Subscribed"; // Reset the submit button text
                document.getElementById("name").value = ""
                document.getElementById("email-phone").value = ""
            }

            // Reset the flag and enable the submit button
            isSubmitting = false;
            submitButton.disabled = false;

        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage.innerHTML = data.error
            errorMessage.style.display = "An error occurred. Please try again later."

            // Reset the flag and enable the submit button
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.innerHTML = 'Join Us';

        });
});



function setSelected(userType) {
    theUserType = userType
    const slider = document.getElementById("btn-slider");
    if (userType == "student") {
        slider.style.left = "3px";
    } else {
        slider.style.left = "calc(100% - 153px)";
    }
    console.log("🚀 ~ file: app.js:38 ~ setSelected ~ document.getElementById(userType):", document.getElementById(userType))

}
