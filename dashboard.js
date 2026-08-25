
// ----------------------------------------------- this is Workspace dropdown -------------------------------------------------

let work_switch = document.querySelector(".workspace-switcher")
let work_drop = document.querySelector(".workspace-dropdown")
let workspace = document.querySelector(".workspace")
let show = false;

work_switch.addEventListener("click", function () {
    if (show == false) {
        work_drop.style.display = "block",
            show = true
    } else {
        work_drop.style.display = "none",
            show = false
    }
})

document.addEventListener('click', function (event) {
    if (!workspace.contains(event.target)) {
        work_drop.style.display = "none";
    }
})


// ---------------------------------------------- this is changing of the workspace name upar 

let coll = document.querySelectorAll(".workspace-item")
let workspace_name = document.querySelector(".workspace-name");



for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function () {
        for (let i = 0; i < coll.length; i++) {
            if (coll[i].classList.contains("active")) {
                coll[i].classList.remove("active");
            }
        }
        this.classList.add("active");
        workspace_name.textContent = this.children[1].textContent;
    })
}

// // -------------------------------------------------------------------

let currentDate = document.querySelector("#currentDate");
let greeting = document.querySelector("#greetings");
let logged = JSON.parse(localStorage.getItem("loggedInUser"));

let userName = logged.firstName;

function updateDateAndGreeting() {

    let today = new Date();
    let hour = today.getHours();

    currentDate.textContent = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    // if (hour < 12) {
    //     greeting.textContent = "Good morning, Aneesh 👋";
    // } else if (hour < 17) {
    //     greeting.textContent = "Good afternoon, Aneesh 👋";
    // } else {
    //     greeting.textContent = "Good evening, Aneesh 👋";
    // }
    if (hour < 12) {

        greeting.textContent = `Good morning, ${userName} 👋`;

    } else if (hour < 17) {

        greeting.textContent = `Good afternoon, ${userName} 👋`;

    } else {

        greeting.textContent = `Good evening, ${userName} 👋`;

    }
}

updateDateAndGreeting();

setInterval(updateDateAndGreeting, 60000); // this is the interval like after every one minute this fxn will run 


// // =====================================================================



let add_assignment = document.querySelector(".add-assignment-btn")
let modal = document.querySelector(".assignment-modal")
let closeAssignment = document.querySelector(".close-assignment");
let cancelAssignment = document.querySelector(".cancel-assignment");
let saveAssignment = document.querySelector(".save-assignment")
let assignmentTitle = document.querySelector("#assignmentTitle");
let assignmentSubject = document.querySelector("#assignmentSubject");
let assignmentDate = document.querySelector("#assignmentDate");
let assignmentTime = document.querySelector("#assignmentTime");
let assignmentPriority = document.querySelector("#assignmentPriority");
let assignmentList = document.querySelector(".all-assignment-list");



add_assignment.addEventListener("click", function () {
    modal.style.display = "flex";

    document.body.classList.add("modal-open");
});


// esc dabane se vo band ho jata hai yey wala function 
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {  // === here will check the type + value 
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }

});

closeAssignment.addEventListener("click", function () {
    modal.style.display = "none";

    document.body.classList.remove("modal-open");
});

cancelAssignment.addEventListener("click", function () {
    modal.style.display = "none";

    document.body.classList.remove("modal-open");
});


let assignments = JSON.parse(localStorage.getItem("assignments")) || []


// json.parse means that we will move convert that saved atring back into our array 

let totalAssignmentCount = document.querySelector(".assignment_count");
let highPriorityCount = document.querySelector(".summary-badge--high");
let pendingCount = document.querySelector(".summary-badge--pending");


let editIndex = null;
let ass_top_1 = document.querySelector(".ass_top_1");
let ass_top_2 = document.querySelector(".ass_top_2");

function renderAssignments() {

    // Remove old assignment HTML
    assignmentList.innerHTML = "";

    let total = assignments.length;
    let high = 0;
    let pending = 0;
    let today = new Date().toISOString().split("T")[0];
    let dueTodayCount = 0;
    let dueToday = document.querySelector("#top_ass");
    let nav_count = document.querySelector(".nav_count");
    let pendingProgress = document.querySelector("#pending_progress");


    for (let i = 0; i < assignments.length; i++) {

        let assignment = assignments[i];

        if (assignment.priority == "High") {
            high++
        }
        if (assignment.status == "Pending") {
            pending++;
        }
        if (assignment.dueDate === today && assignment.status === "Pending") {
            dueTodayCount++;
        }


        let row = document.createElement("article");

        row.className = "all-assignment-item";

        let mainDetails = document.createElement("div");

        mainDetails.className = "assignment-main-details";


        // --------------------------------------------------
        // SUBJECT ICON
        // --------------------------------------------------

        let subjectIcon = document.createElement("span");

        subjectIcon.className = "subject-icon subject-icon--purple";
        subjectIcon.textContent = assignment.subject.substring(0, 2).toUpperCase();
        mainDetails.appendChild(subjectIcon);

        // --------------------------------------------------
        // TITLE + SUBJECT
        // --------------------------------------------------

        let details = document.createElement("div");
        details.className = "assignment-details";

        let title = document.createElement("h3");
        title.textContent = assignment.title;

        if (assignment.status === "Completed") {
            title.style.textDecoration = "line-through"
        }

        let subject = document.createElement("p");
        subject.textContent = assignment.subject;

        details.appendChild(title);
        details.appendChild(subject);
        mainDetails.appendChild(details);

        row.appendChild(mainDetails);

        // --------------------------------------------------
        // DATE + TIME
        // --------------------------------------------------

        let assignmentDate = document.createElement("div");

        assignmentDate.className = "assignment-date";


        let dateLabel = document.createElement("span");

        dateLabel.textContent = "Due date";


        let dueDate = document.createElement("strong");

        dueDate.textContent = assignment.dueDate;


        let dueTime = document.createElement("small");

        dueTime.textContent = assignment.dueTime;


        assignmentDate.appendChild(dateLabel);
        assignmentDate.appendChild(dueDate);
        assignmentDate.appendChild(dueTime);

        row.appendChild(assignmentDate);



        // --------------------------------------------------
        // PRIORITY
        // -------------------------------------------------
        let priority = document.createElement("span");
        priority.className = "priority-badge";


        priority.classList.add(
            "priority-badge--" +
            assignment.priority.toLowerCase()
        );


        priority.textContent = assignment.priority;

        row.appendChild(priority);

        // --------------------------------------------------
        // STATUS
        // --------------------------------------------------
        let status = document.createElement("span");

        status.className = "assignment-status";

        if (assignment.status === "Completed") {
            status.classList.add("assignment-status--completed");
        } else {
            status.classList.add("assignment-status--pending");
        }
        status.textContent = assignment.status;

        row.appendChild(status);


        // --------------------------------------------------
        // THREE DOT OPTIONS BUTTON
        // --------------------------------------------------

        let options = document.createElement("button");
        options.className = "assignment-options-btn";
        options.type = "button";
        options.setAttribute(
            "aria-label",
            "Assignment options"
        );
        options.textContent = "...";


        let menu = document.createElement("div");
        menu.className = "assignment-options-menu";
        // -------------------------------------------------------------------------------------
        //                                     this is the complete function 
        // ------------------------------------------------------------------------------------
        let completeOption = document.createElement("div");
        completeOption.className = "assignment-option";
        completeOption.textContent = "✓ Mark as completed";

        completeOption.addEventListener("click", function () {
            assignments[i].status = "Completed";
            localStorage.setItem("assignments", JSON.stringify(assignments));
            renderAssignments();
        })
        // -------------------------------------------------------------------------------------
        // ----------------------------------------------this is edit option 
        // ------------------------------------------------------------------------------------
        let editOption = document.createElement("div");
        editOption.className = "assignment-option";
        editOption.textContent = "✏ Edit";

        editOption.addEventListener("click", function () {
            editIndex = i;
            assignmentTitle.value = assignments[i].title;
            assignmentSubject.value = assignments[i].subject;
            assignmentDate.value = assignments[i].dueDate;
            assignmentTime.value = assignments[i].dueTime;
            assignmentPriority.value = assignments[i].priority;
            modal.style.display = "flex";
        })

        // ---------------------------------- this is the delete function 
        let deleteOption = document.createElement("div");
        deleteOption.className = "assignment-option";
        deleteOption.textContent = "🗑 Delete";

        deleteOption.addEventListener("click", function () {

            assignments.splice(i, 1); // why because we have an array and i will have 0 based index and when i click on the specific i it will delete 
            localStorage.setItem(
                "assignments",
                JSON.stringify(assignments)// again storing back into the localstorage
            );
            renderAssignments();// calling this again because hame fir se html ko build karna hoga why because html will stil reflect the old data 
        });
        // ------------------------------------------------------------------------------


        menu.appendChild(completeOption);
        menu.appendChild(editOption);
        menu.appendChild(deleteOption);

        let optionsContainer = document.createElement("div");
        optionsContainer.className = "assignment-options-container";

        optionsContainer.appendChild(options);
        optionsContainer.appendChild(menu);

        row.appendChild(optionsContainer);

        // --------------------------------------------------
        // PUT ROW INTO THE PAGE
        // --------------------------------------------------

        assignmentList.appendChild(row);
        options.addEventListener("click", function () {


            if (menu.style.display == "block") {
                menu.style.display = "none";
            } else {
                menu.style.display = "block";
            }

        });
    }

    totalAssignmentCount.textContent = total + " assignments";
    highPriorityCount.textContent = high + " High priority";
    pendingCount.textContent = pending + " Pending";
    ass_top_1.textContent = pending;
    ass_top_2.textContent = high + " high priority"

    dueToday.textContent = "↗ " + dueTodayCount + " due today";
    nav_count.textContent = pending;
    let completed = assignments.length - pending;
    if (assignments.length > 0) {
        pendingProgress.style.width = (completed / assignments.length) * 100 + "%";
    } else {
        pendingProgress.style.width = "0%";
    }

}

// ======================================================
// SAVE ASSIGNMENT
// ======================================================

saveAssignment.addEventListener("click", function () {

    let newAssignment = {
        title: assignmentTitle.value,
        subject: assignmentSubject.value,
        dueDate: assignmentDate.value,
        dueTime: assignmentTime.value,
        priority: assignmentPriority.value,
        status: "Pending"
    };

    if (editIndex === null) {// this means ki new insert karne ja rha hu 
        assignments.push(newAssignment);
    } else {
        assignments[editIndex] = newAssignment;// we will keep the new assignment on the index which we have clicked 
    }

    localStorage.setItem("assignments", JSON.stringify(assignments)); // updating the local storage 

    renderAssignments(); // again called because we want to update the html of the assignemnets 

    // modal.style.display = "none";
    modal.style.setProperty("display", "none", "important");

    assignmentTitle.value = "";
    assignmentSubject.value = "";
    assignmentDate.value = "";
    assignmentTime.value = "";
    assignmentPriority.value = "Low";

    editIndex = null;
});

renderAssignments(); // inital render beacuse jab khulega toh bhi to pending wali dikhni chaiyeeee 


let quick_add_ass = document.querySelector(".quick_add_ass");
quick_add_ass.addEventListener("click", function () {
    modal.style.display = "flex";
})



// ------------------------------------------ dark theme light theme ---------------------------------------------

const themeToggle = document.querySelector(".theme-toggle"); // this is finding the btn that is theme toggle

function setTheme(theme) { // this is fxn of set theme with one parameter light ya dark 
    const isDark = theme === "dark"; // this is the comparison that whether the argument passed is dark or light if dark then isDark true
    document.documentElement.classList.toggle("dark-theme", isDark);// this will add or remove the class dark-theme in the html
    document.body.classList.toggle("dark-theme", isDark);// this will add the class dark theme in the div and why here also bec more flexibility
    localStorage.setItem("theme", isDark ? "dark" : "light"); // this will save into local storage

    themeToggle.setAttribute("aria-pressed", String(isDark)); // this is the btn switching to the light mode and dark 
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.textContent = isDark ? "☀" : "◐";
}

setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light"); // this is fxn calling with the old saved value of dark/ light theme 

themeToggle.addEventListener("click", function () {
    setTheme(document.body.classList.contains("dark-theme") ? "light" : "dark");
});


// ------------------------------------------------------ logout btn 
let logout_btn = document.querySelector(".logout-btn");

let loggedInUser = localStorage.getItem("loggedInUser");


logout_btn.addEventListener("click", function () {

    localStorage.removeItem("loggedInUser"); // we will remove the user data from the localstorage 
    window.location.replace("login.html");

});

let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUsers) {

    let firstName = loggedInUsers.firstName;

    // Top workspace name
    let workspaceName = document.querySelector("#workspaceName");

    if (workspaceName) {
        workspaceName.textContent = `${firstName}'s space`;
    }

    // Dropdown workspace name
    let workspaceNameDown = document.querySelector("#workspaceName-down");

    if (workspaceNameDown) {
        workspaceNameDown.textContent = `${firstName}'s space`;
    }
}

let loggedInUsertt = JSON.parse(localStorage.getItem("loggedInUser"));

let topProfileAvatar = document.querySelector("#topProfileAvatar");

if (loggedInUsertt && topProfileAvatar) {
    let initials =
        loggedInUsertt.firstName.charAt(0) +
        loggedInUsertt.lastName.charAt(0);

    topProfileAvatar.textContent = initials.toUpperCase();
}