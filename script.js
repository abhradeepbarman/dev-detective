const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");

const profilePic = document.querySelector("[data-profilePic]");
const originalName = document.querySelector("[data-name]");
const joinDate = document.querySelector("[data-joinDate]");
const usernameDisplay = document.querySelector("[data-username]");
const bio = document.querySelector("[data-bio]");
const repos = document.querySelector("[data-repos]");
const followers = document.querySelector("[data-followers]");
const following = document.querySelector("[data-following]");
const locationOfUser = document.querySelector("[data-location]");
const website = document.querySelector("[data-website]");
const twitter = document.querySelector("[data-twitter]");
const company = document.querySelector("[data-company]");

const searchForm = document.querySelector(".search-container");
const userNotFound = document.querySelector("[data-UserNotFound]");
const input = document.querySelector("[data-input]");
const xMark = document.querySelector(".xMark");
const displayProfile = document.querySelector(".display-profile");

const statNum = document.querySelectorAll(".stat-num")
const statsContainer = document.querySelector(".stats-container")

let currentMode = true;
const body = document.querySelector("body")
//true --> light
//false --> dark

lightMode.addEventListener("click", () => {
    lightMode.classList.remove("active");
    darkMode.classList.add("active");
    switchMode();
})

darkMode.addEventListener("click", () => {
    darkMode.classList.remove("active");
    lightMode.classList.add("active");
    //BG, Font change
    switchMode();
})

function switchMode() {
    if(currentMode) {
        currentMode = false;
        body.classList.add("dark");
        searchForm.classList.add("dark");
        input.classList.add("dark");
        displayProfile.classList.add("dark");
        originalName.classList.add("dark")
        statNum.forEach((element) => {
            element.classList.add("dark");
        })
        statsContainer.classList.add("dark");
        website.classList.add("dark");
        twitter.classList.add("dark");
    }
    else {
        currentMode = true;
        body.classList.remove("dark");
        searchForm.classList.remove("dark");
        input.classList.remove("dark");
        displayProfile.classList.remove("dark");
        originalName.classList.remove("dark");
        statNum.forEach((element) => {
            element.classList.remove("dark");
        })
        statsContainer.classList.remove("dark")
        website.classList.remove("dark");
        twitter.classList.remove("dark");
    }
}


initDisplay();

function initDisplay() {
    darkMode.classList.add("active");
    let username = "abhradeepbarman";
    renderProfile(username);
}

async function renderProfile(username) {
    xMark.classList.remove("active");
    
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let res = await response.json();

        if(response.status !== 200) {
            userNotFound.classList.add("active");
            return;
        }

        originalName.textContent = res.name;
        profilePic.src = res?.avatar_url;
        datesegments = res?.created_at.split("T").shift().split("-");
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        joinDate.textContent = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        usernameDisplay.textContent = `@${res?.login}`;
        usernameDisplay.setAttribute("href", res?.html_url);
        bio.textContent = (res?.bio == null) ? "This profile has no bio" : res?.bio;
        repos.textContent = res?.public_repos;
        followers.textContent = res?.followers;
        following.textContent = res?.following;

        locationOfUser.textContent = (res?.location != null) ? res?.location : "Not Available";
        
        if(res?.blog != "") {
            website.textContent = res?.blog;
            website.href = res?.blog;
        } 
        else {
            website.textContent = "Not Available";
        }
        
        if(res?.twitter_username != null) {
            twitter.textContent = res?.twitter_username;
            twitter.href = `https://twitter.com/${res?.twitter_username}`
        } 
        else {
            twitter.textContent = "Not Available";
        }

        company.textContent = (res?.company != null) ? res?.company : "Not Available";        
    } 
    catch (error) {
        //H.W
    }  
} 

searchForm.addEventListener("submit", function(event){
    event.preventDefault();

    let username = input.value;
    renderProfile(username);
});


input.addEventListener("input",() => {
    if(input.value.trim() == "") {
        xMark.classList.remove("active");
    }
    else {
        xMark.classList.add("active");
    }

    userNotFound.classList.remove("active");
})

xMark.addEventListener("click", () => {
    input.value = "";
})