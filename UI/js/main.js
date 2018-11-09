  // login backend *******************************************************************************************
var login_form = document.getElementById('login');
if(login_form){
  login_form.addEventListener('submit', Login);
}

function Login(e){
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  fetch('https://my-store-manager-api.herokuapp.com/api/v2/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, test/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({username:username, password:password})
  })
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((data) => {
    localStorage.setItem('access_token', data.access_token)
    if(data.access_token){
      redirect: window.location.replace("./admin.html")
    } else{
      let error_message = document.getElementById('error-message')
      if (error_message){
        error_message.innerHTML = data.message
      }
    }
  })
  .catch((err) => console.log(err))
}

// END login backend ************************************************************************************

// Access token from login
const token = localStorage.getItem('access_token')
const access_token = "Bearer " + token
  
function showContainer(evt, sectionID) {
    // Declare all variables
    var i, dashboardcontainer, tablinks;

    // Get all elements with class="dashboardcontainer" and hide them
    dashboardcontainer = document.getElementsByClassName("dash-container");
    for (i = 0; i < dashboardcontainer.length; i++) {
        dashboardcontainer[i].style.display = "none";
    }
    
    // Get all elements with class="tablinks active" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks active");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var sectionid = document.getElementById(sectionID);
    if(sectionid){
      sectionid.style.display = "block";
      evt.currentTarget.className += " active";
    } 
}

 function clickFunction() {

     // Get the element with id="default" and click on it
     document.getElementById("default").click();
    
    //  get all users on load
     getUsers()
 }

// Get the whole modal
var modal = document.getElementById('editModal');

// Get the button that opens the modal i.e edit-btn
var btn = document.getElementById("edit-btn");

// Get the <span> element that closes the modal i.e the x symbol
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button((edit-btn), open the modal (editModal)
if(btn){
  btn.onclick = function(){
    modal.style.display = "block"
  }
}

// When the user clicks on <span> (x), close the modal
if(span){
    span.onclick = function() {
        modal.style.display = "none";
  }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// filter sales by search input
function inputFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("sales");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function insertFunction() {
    var table = document.getElementById("products");
    var pid = document.getElementById("pid").value;
    var pname = document.getElementById("pname").value;
    var pprice = document.getElementById("pprice").value;
    var pquantity = document.getElementById("pquantity").value;
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = pid;
    cell2.innerHTML = pname;
    cell2.innerHTML = pprice;
    cell2.innerHTML = pquantity;
}

// filter product by name
function productFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("productInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("view-products");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }



// Add User backend *************************************************************************************
var registration_form = document.getElementById('registration');
if(registration_form){
  registration_form.addEventListener('submit', Registration);

}


function Registration(e){
  e.preventDefault();

  let name_reg = document.getElementById('name-reg').value;
  let username_reg = document.getElementById('username-reg').value;
  let email_reg = document.getElementById('email-reg').value;
  let password_reg = document.getElementById('password-reg').value;
  let gender_reg = document.getElementById('gender-reg').value;
  let role_reg = document.getElementById('role-reg').value;

  const data_reg = {
    "name": name_reg,
    "username": username_reg,
    "email": email_reg,
    "password": password_reg,
    "gender": gender_reg,
    "role": role_reg
  }

  fetch('https://my-store-manager-api.herokuapp.com/api/v2/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, test/plain, */*',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": access_token
    },
    body: JSON.stringify(data_reg)
  })
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((data) => {
    let error_reg = document.getElementById('error-reg')
    if(data.message == "User exist with the same username/email"){
      error_reg.style.color = 'red';
      error_reg.innerHTML= data.message;
    }
    if(data.message == "Invalid Email"){
      error_reg.style.color = 'red';
      error_reg.innerHTML= data.message;
    }
    if(data.message == "Gender should  either be male or female"){
      error_reg.style.color = 'red';
      error_reg.innerHTML= data.message;
    }
    if(data.message == "Role should  either be admin or attendant"){
      error_reg.style.color = 'red';
      error_reg.innerHTML= data.message;
    }
    if(data.message == "User created successfully"){
      error_reg.style.color = 'green';
      error_reg.innerHTML= data.message;
    }
    if(data.msg == "Token has expired"){
      error_reg.style.color = 'red';
      error_reg.innerHTML= 'Session has expired kindly login again'
    }
    
  })
  .catch((err) => console.log(err))
}



// END Add User backend **********************************************************************************


// GET User backend *************************************************************************************
var view_users = document.getElementById('view-users');
if(view_users){
  view_users.addEventListener('click', getUsers);
}


function getUsers(){
  fetch('https://my-store-manager-api.herokuapp.com/api/v2/users', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": access_token
    }
  })
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((data) => {
    let all_users = `
                      <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Role</th>
                      <th>Action</th>
                      </tr>
                      `;
    data['Users'].forEach(function(user){
      all_users +=  `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.role}</td>
            <td>
                <div class="sales-modify-btn">
                <button class="attendant-delete">delete</button>
                </div>
            </td>
        </tr>
      `;
    });
    document.getElementById('users').innerHTML = all_users;
  })
  .catch((err) => console.log(err))
}

// END GET User backend **********************************************************************************


// run showContainer function
showContainer()

