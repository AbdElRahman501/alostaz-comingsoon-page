let theUserType = "student"

document.getElementById("subscribe-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const formData = {
        userType: theUserType,
        name: name,
        email: email
    };

    // Send data to the API endpoint (replace with your actual API URL)
    fetch("http://localhost:3000/Api/users/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data submitted:", data);
            alert("Thank you for subscribing!");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
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
