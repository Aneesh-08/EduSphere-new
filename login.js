let loginForm = document.querySelector("#loginform"); // again getting the login form and savaing into login form 

loginForm.addEventListener("submit", function (event) {

    // Stop normal form submission
    event.preventDefault();

    // Get all registered users from localStorage
    let users = JSON.parse(localStorage.getItem("users") ) || [];

    // Get email entered by the user
    let email = document.querySelector("#loginemail").value;

    // Get password entered by the user
    let password = document.querySelector("#loginpass").value;


    // there is fxn that will check wether the user email match the exsistening email or not and then it will set true / false in the var 
    let existingUser = users.find(function (user) {

        return user.email === email;  
    });

    // If no user exists with this email
    if (!existingUser) {
        alert("No account found with this email.");
        return;
    }

    // Check whether password is correct
    if (existingUser.password !== password) {
        alert("Incorrect password.");
        return;
    }

    // Login successful
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(existingUser)
    );

    // Go to dashboard
    window.location.href = "dashboard.html";

});