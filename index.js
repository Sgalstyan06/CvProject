import { members } from "./data.js";
let trainees =
  getFromLocalStorage("members") || saveToLocalStorage("members", members);

function initGridList() {
  let box = document.querySelector(".grid-container");
  box.innerHTML = ` <div class="button" id="button">
  <a href="#add-new-person">Add New Person</a>
</div>`;
  trainees.forEach((item) => {
    box.innerHTML += ` 
      <div class="grid-item">
          <a href = "#bioPage?id=${item.id}">
          ${item.firstName} ${item.lastName}
          </a>
      </div>
      `;
  });
}

window.onload = () => {
  generateHash();
};
window.addEventListener("hashchange", function () {
  generateHash();
});
function generateHash() {
  let cvGridListPage = document.getElementById("cv-grid-list-page");
  let cvPage = document.getElementById("cv-page");
  let aboutPage = document.getElementById("about-page");
  let servicePage = document.getElementById("service-page");
  let addNewCvPage = document.getElementById("add-new-cv-page");
  const HASH = window.location.hash;
  switch (HASH) {
    case "":
    case "#home":
      cvGridListPage.classList.remove("hiden");
      cvPage.classList.add("hiden");
      aboutPage.classList.add("hiden");
      servicePage.classList.add("hiden");
      addNewCvPage.classList.add("hiden");
      initGridList();
      break;
    case "#about":
      cvGridListPage.classList.add("hiden");
      cvPage.classList.add("hiden");
      aboutPage.classList.remove("hiden");
      servicePage.classList.add("hiden");
      addNewCvPage.classList.add("hiden");
      break;
    case "#service":
      cvGridListPage.classList.add("hiden");
      cvPage.classList.add("hiden");
      aboutPage.classList.add("hiden");
      servicePage.classList.remove("hiden");
      addNewCvPage.classList.add("hiden");
      break;
    case "#add-new-person":
      cvGridListPage.classList.add("hiden");
      cvPage.classList.add("hiden");
      aboutPage.classList.add("hiden");
      servicePage.classList.add("hiden");
      addNewCvPage.classList.remove("hiden");
      break;
    default:
      if (HASH.includes("id=")) {
        addUserData(findUserById(window.location.hash.split("=")[1]));
        cvGridListPage.classList.add("hiden");
        cvPage.classList.remove("hiden");
        aboutPage.classList.add("hiden");
        servicePage.classList.add("hiden");
        addNewCvPage.classList.add("hiden");
      }
  }
}

function addUserData(trainee) {
  let img = document.querySelector("#personImg");
  img.src = trainee.imagePath || `./img/${trainee.firstName}${trainee.lastName}.jpg`;
  let imgLoad = false;
  img.onload = function(){
    imgLoad = true;
  } ; 
  img.onerror = function(){
    img.src = "./img/CV.png";
  };
  document.querySelector(".firstName").innerHTML = trainee.firstName;
  document.querySelector(".lastName").innerHTML = trainee.lastName;
  document.querySelector(".phone").innerHTML = trainee.phone;
  document.querySelector(".email").innerHTML = trainee.email;
  document.querySelector(".education").innerHTML = trainee.education;
  document.querySelector(".workExperience").innerHTML = trainee.workExperience;
  document.querySelector(".trainings").innerHTML = trainee.trainings;
  
 
}
function findUserById(userId) {
  return trainees.find((user) => user.id == userId);
}
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}
function getFromLocalStorage(key) {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return false;
}
document
  .getElementById("new-member-submit")
  .addEventListener("click", function foo() {
    let newUser = {
      id: new Date().valueOf(),
      imagePath: "",
    };
    let inputs = document.getElementById("new-member").elements;
    for (let elem of inputs) {
      newUser[elem.name] = elem.value;
    }
    trainees.push(newUser);
    saveToLocalStorage("members", trainees);
    window.location.hash = "#home";
  });
