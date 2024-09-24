class ExperienceTracker {
    constructor() {
        this.experience = [];
    }

    addExperience(amount, category) {
        this.experience.push({amount, category});
    }

    totalExperience(selectedExperience) {
        return selectedExperience.reduce((sum, exp) => sum + exp.amount, 0);
    }
}

// User management system
const users = {};

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.tracker = new ExperienceTracker();
        this.totalAccumulatedExp = 0;
    }
}


// Initialize default users
users['user1'] = new User('user1', 'password');
users['user2'] = new User('user2', 'password2')



// Initialize default experiences for these users
initializeDefaultExperiences(users['user1']);


let currentUser = null;
const maxExp = 500;

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
// initialize experiences for user
function initializeDefaultExperiences(user) {
    user.tracker.addExperience(5, "Run");
    user.tracker.addExperience(5, "Climb");
    user.tracker.addExperience(7, "Studying / Coding");
    user.tracker.addExperience(7, "Reading");
    user.tracker.addExperience(3, "Cold Showers");
    user.tracker.addExperience(3, "Eat Healthily");
    user.tracker.addExperience(5, "Puzzle Rush Set");
}

function register() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    if (users[username]) {
        alert("Username already exists!");
    return;
}
    users[username] = new User(username, password);
    initializeDefaultExperiences(users[username]);
    alert("Registration successful! Please log in.");
    showLogin();
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        updateExpenseCheckboxes();
        updateTotalExpDisplay();
    } else {
        alert("error: " + username + " " + password)
    }
}


function updateExpenseCheckboxes() {
    const checkboxContainer = document.getElementById('checkboxes');
    checkboxContainer.innerHTML = '';
    currentUser.tracker.experience.forEach((exp, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `exp-${index}`;
        checkbox.value = exp.amount;
        const label = document.createElement('label');
        label.htmlFor = `exp-${index}`;
        label.textContent = exp.category;
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement('br'));
    });
}

function calcExp() {
    const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]:checked');
    const selectedExperience = Array.from(checkboxes).map(cb => ({amount: parseFloat(cb.value)}));
    const baseExp = currentUser.tracker.totalExperience(selectedExperience);
    const newExp = checkboxes.length * baseExp;
    currentUser.totalAccumulatedExp += newExp;
    updateTotalExpDisplay();
    checkboxes.forEach(cb => cb.checked = false);
}

function updateTotalExpDisplay() {
    const levels = Math.floor(currentUser.totalAccumulatedExp / maxExp);
    const remainingExp = currentUser.totalAccumulatedExp % maxExp;
    const progressBar = document.getElementById('progressBar');
    progressBar.value = remainingExp;
    document.getElementById('totalExpDisplay').textContent = `Total Experience: ${currentUser.totalAccumulatedExp} (Level ${levels}, ${remainingExp}/${maxExp})`;
}
