window.onload = function() { displayEntries();};
function addEntry(){
    const site = document.getElementById('site').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!site || !username || !password) {
        alert("All fields are required!");
        return;
    }
}

const entry = {site, username , password};
let entries = JSON.parse(localStorage.getItem("passwords")) || [];
entries.push(entry);
localStorage.setItem("passwords",JSON.stringify(entries));

document.getElementById('site').value = "";
document.getElementById('username').value = "";
document.getElementById('password').value= "";


displayEntries();


function deleteEntry(index){
    let entries = JSON.parse(localStorage.getItem("passwords")) || [];
    entries.splice(index , 1);
    localStorage.setItem("passwords" , JSON.stringify(entries));
    displayEntries();
}


function togglePasswordVisibility(btn, passElem){
    const passwordField = passElem.querySelector('.password-text');
    const isVisible = passwordField.dataset.visible === "true";

    passwordField.textContent = isVisible ? "••••••••" : passwordField.dataset.password;
    passwordField.dataset.visible = !isVisible;
    btn.textContent = isVisible ? "Show" : "Hide";

}

function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    let entries = JSON.parse(localStorage.getItem("passwords")) || [];
    entriesDiv.innerHTML = "";
  
    entries.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";
  
      entryDiv.innerHTML = `
        <div class="entry-info">
          <strong>${entry.site}</strong><br>
          ${entry.username}<br>
          <span class="password-text" data-password="${entry.password}" data-visible="false">••••••••</span>
        </div>
        <div class="entry-buttons">
          <button onclick="togglePasswordVisibility(this, this.parentElement.parentElement)">Show</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        </div>
      `;
  
      entriesDiv.appendChild(entryDiv);
    });
  }
  