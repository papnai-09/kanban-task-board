const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const profileCard = document.getElementById("profileCard");
const reposContainer = document.getElementById("reposContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const repoTitle = document.getElementById("repoTitle");

searchBtn.addEventListener("click", searchUser);

searchInput.addEventListener("keydown", (e) => {
if(e.key === "Enter"){
searchUser();
}
});

async function searchUser(){

const username = searchInput.value.trim();

if(!username){
error.innerText="Please enter a username";
return;
}

loading.innerText="Loading...";
error.innerText="";
profileCard.innerHTML="";
reposContainer.innerHTML="";
repoTitle.innerText="";

try{

const response = await fetch(`https://api.github.com/users/${username}`);

if(!response.ok){
throw new Error("User Not Found");
}

const user = await response.json();

showProfile(user);

await getRepos(user.repos_url);

loading.innerText="";

}

catch(err){

loading.innerText="";
error.innerText="User Not Found";

}

}

function showProfile(user){

const joinDate = new Date(user.created_at);

const formattedDate = joinDate.toLocaleDateString("en-GB",{
day:"numeric",
month:"short",
year:"numeric"
});

const portfolio =
user.blog && user.blog !== ""
? `<a href="${user.blog}" target="_blank">Portfolio</a>`
: "No portfolio";

profileCard.innerHTML = `

<div class="profile-card">

<img src="${user.avatar_url}" alt="avatar">

<h2>${user.name || user.login}</h2>

<p>${user.bio || "No bio available"}</p>

<p>Joined: ${formattedDate}</p>

<p>${portfolio}</p>

</div>

`;

}

async function getRepos(url){

const response = await fetch(url);

const repos = await response.json();

const latestRepos = repos
.sort((a,b)=> new Date(b.created_at)-new Date(a.created_at))
.slice(0,5);

if(latestRepos.length === 0){
return;
}

repoTitle.innerText="Latest Repositories";

latestRepos.forEach(repo => {

const repoDiv = document.createElement("div");

repoDiv.classList.add("repo");

repoDiv.innerHTML = `
<a href="${repo.html_url}" target="_blank">${repo.name}</a>
`;

reposContainer.appendChild(repoDiv);

});

}