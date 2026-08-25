let registerForm = document.querySelector("#registerForm"); // getting the form and storing it into registerform

registerForm.addEventListener("submit", function (event) {

    // Stop the normal form submission
    event.preventDefault();

    // Get all existing registered users
    let users = JSON.parse(localStorage.getItem("users")) || [];  // getting the prev user from the local storage 


    // Get values entered by the new user
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#registerEmail").value;
    let program = document.querySelector("#program").value;
    let password = document.querySelector("#registerPassword").value;


    // Check whether the email is already registered
    let existingUser = users.find(function (user) { 

        return user.email === email;

    });


    if (existingUser) {

        alert("An account with this email already exists.");

        return;
    }


    // Create a new user object
    let newUser = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        program: program,

        password: password

    };


    // Add the new user to the users array
    users.push(newUser);


    // Save the updated users array
    localStorage.setItem("users", JSON.stringify(users));


    alert("Account created successfully! Please log in.");


    // Redirect to login page
    window.location.href = "login.html";

});