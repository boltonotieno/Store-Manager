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

// Windows on load ***************************************************************
 function clickFunction() {

     // Get the element with id="default" and click on it
     document.getElementById("default").click();
    
    //  get all users on load
     getUsers()

    //  get all categories on load
     getCategory()

    //  set all categories on load to product form
    setCategory()

    //  get all products on load 
    getProducts()
 }
// Windows on load ***************************************************************

// Get the whole modal
var modal = document.getElementById('editModal');

// Get the whole edit role modal
var edit_role_modal = document.getElementById('edit_roleModal');

// Get the button that opens the modal i.e edit-btn
var btn = document.getElementById("edit-btn");

// Get the button that opens the edit role modal i.e editRole-btn
var edit_role_btn = document.getElementById("editRole-btn");

// Get the <span> element that closes the modal i.e the x symbol
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button((edit-btn), open the modal (editModal)
if(btn){
  btn.onclick = function(){
    modal.style.display = "block"
  }
}

// When the user clicks the button((edit-btn), open the modal (editModal)
if(edit_role_btn){
  edit_role_btn.onclick = function(){
    edit_role_modal.style.display = "block"
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
    cell3.innerHTML = pprice;
    cell4.innerHTML = pquantity;
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
      getUsers()
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
    let no_users = document.getElementById('no-users')
    if(data.message == 'No users'){
      no_users.style.display = 'block';
      no_users.innerHTML= data.message; 
    }
    else{
    no_users.style.display = 'none';
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
                <div class="attendant-modify-btn">
                <button id="editRole-btn" onclick="modifyRole()" class="attendant-role">role</button>
                </div>
            </td>
        </tr>
      `;
    });
    document.getElementById('users').innerHTML = all_users;
    document.getElementById('edit-roleChoice').innerText

    }
  })
  .catch((err) => console.log(err))
}

// END GET User backend **********************************************************************************


// PUT user role ****************************************************************************************

// close edit role modal
function close_roleModal(){
  var edit_role_modal = document.getElementById('edit_roleModal');
  edit_role_modal.style.display = "none";
  let error_role = document.getElementById('error-role')
  error_role.style.display = 'none';
  getUsers()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == edit_role_modal) {
      edit_role_modal.style.display = "none";
      let error_role = document.getElementById('error-role')
      error_role.style.display = 'none';
      getUsers()
  }
}


function modifyRole(){
  var table = document.getElementById("users"), index;
  for ( var i = 0; i < table.rows.length; i++){
    table.rows[i].onclick = function(){
      index = this.rowIndex;
      user_id = this.cells[0].innerHTML;
      document.getElementById('edit-roleName').value = this.cells[1].innerHTML;
      user_name = this.cells[1].innerHTML;
      user_username = this.cells[2].innerHTML;
      document.getElementById('edit-roleChoice').value = this.cells[5].innerHTML;

      if(user_id){
        // Get the whole edit role modal
        var edit_role_modal = document.getElementById('edit_roleModal');
        edit_role_modal.style.display = "block"
        }
    }
  }

  var role_form = document.getElementById('role-form');
  if(role_form){
  role_form.addEventListener('submit', Role);
  }

  function Role(e){
    e.preventDefault();

    let role_edit = document.getElementById('edit-roleChoice').value;

    const data_edit_role = {
      "role": role_edit
    }

    fetch(`https://my-store-manager-api.herokuapp.com/api/v2/users/${user_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, test/plain, */*',
        'Content-type': 'application/json',
        "Authorization": access_token
      },
      body: JSON.stringify({role:role_edit})
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((data) => {
          let error_role = document.getElementById('error-role')
          error_role.style.display = 'block';
          if(data.message == `User ${user_username} is already an attendant`){
          error_role.style.color = 'red';
          error_role.innerHTML= data.message;      
          }
          if(data.message == `User ${user_username} is already an admin`){
            error_role.style.color = 'red';
            error_role.innerHTML= data.message;      
            }
          if(data.message == `Default admin cant be modified`){
          error_role.style.color = 'red';
          error_role.innerHTML= data.message;      
          }
          if(data.message == `User ${user_name} change role to ${role_edit} succesfully`){
            error_role.style.color = 'green';
            error_role.innerHTML= data.message;      
            }
          if(data.msg == "Token has expired"){
            error_role.style.color = 'red';
            error_role.innerHTML= 'Session has expired kindly login again'
          }
    })
    .catch((err) => console.log(err))
  }
}

// editrole-modal cancel-btn
var view_users_role = document.getElementById('view-users-role');
if(view_users_role){
  view_users_role.addEventListener('click', getUsers);
}
// END PUT user role ************************************************************************************


// POST new category ************************************************************************************

var category_form = document.getElementById('category-form');
if(category_form){
category_form.addEventListener('submit', postCategory);
}

function postCategory(e){
  e.preventDefault();

  let cat_name = document.getElementById('category-name').value

  fetch(`https://my-store-manager-api.herokuapp.com/api/v2/category`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, test/plain, */*',
      'Content-type': 'application/json',
      "Authorization": access_token
    },
    body: JSON.stringify({name:cat_name})
  })
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((data) => {
    let error_category = document.getElementById('error-category')
    if(data.message == `Category ${cat_name} already exist`){
    error_category.style.color = 'red';
    error_category.innerHTML= data.message;      
    }
    if(data.message == `Invalid category name ${cat_name}`){
      error_category.style.color = 'red';
      error_category.innerHTML= data.message;      
      }
    if(data.message == `Category created successfully`){
      error_category.style.color = 'green';
      error_category.innerHTML= data.message;
      setCategory()   
      }

    if(data.msg == "Token has expired"){
      error_category.style.color = 'red';
      error_category.innerHTML= 'Session has expired kindly login again'
    }
  })
  .catch((err) => console.log(err))
}

// End post new category ********************************************************************************


// GET all categories ***********************************************************************************
var view_category = document.getElementById('back-category-view');
if(view_category){
  view_category.addEventListener('click', getCategory);
}

function getCategory(){
  fetch('https://my-store-manager-api.herokuapp.com/api/v2/category', {
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
    let no_category = document.getElementById('no-category')
    if(data.message == 'No categories'){
      no_category.style.display = 'block';
      no_category.style.color = 'red';
      no_category.innerHTML= data.message; 
    }
    else{
    no_category.style.display = 'none';
          let all_categories = `
                      <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>
                      </tr>
                      `;
    data['Categories'].forEach(function(category){
      all_categories +=  `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>
            <div class="sales-modify-btn">
            <button id="modify-cat-btn" onclick="modifyCategory()">edit</button>
            <button id="delete-cat-btn" onclick="deleteCategory()">delete</button>
            </div>
            </td>
        </td>
        </tr>
      `;
    });
    document.getElementById('category').innerHTML = all_categories;
    }
  })
  .catch((err) => console.log(err))
}

// END GET all categories *******************************************************************************


// DELETE a category  ************************************************************************************
function deleteCategory(){
  var table_cat = document.getElementById("category"), index;
  for ( var i = 0; i < table_cat.rows.length; i++){
    table_cat.rows[i].onclick = function(){
      index = this.rowIndex;
      cat_id = this.cells[0].innerHTML;

      fetch(`https://my-store-manager-api.herokuapp.com/api/v2/category/${cat_id}`, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": access_token
        }
      })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        let no_category = document.getElementById('no-category')
        if(data.message == `Category id ${cat_id} not Found`){
          no_category.style.display = 'block';
          no_category.style.color = 'red';
          no_category.innerHTML= data.message; 
        }
        if(data.message == `There exist a product with category_id ${cat_id}`){
          no_category.style.display = 'block';
          no_category.style.color = 'red';
          no_category.innerHTML= data.message; 
        }
        if(data.message == `Category id ${cat_id} successfuly deleted`){
          for(var i = table_cat.rows.length - 1; i > -1; i--){
              table_cat.deleteRow(i);
              }
          no_category.style.display = 'block';
          no_category.style.color = 'green';
          no_category.innerHTML= data.message;
          getCategory()
          setCategory()
        }
        if(data.msg == "Token has expired"){
          no_category.innerHTML= 'Session has expired kindly login again'
        }
        
      })
      .catch((err) => console.log(err))
    }
  }
}

// END DELETE a category ********************************************************************************

// PUT category *****************************************************************************************
// close edit category modal
function close_catModal(){
  var edit_cat_modal = document.getElementById('edit_catModal');
  edit_cat_modal.style.display = "none";
  let error_cat = document.getElementById('error-cat')
  error_cat.style.display = 'none';
  getCategory()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var edit_cat_modal = document.getElementById('edit_catModal');
  if (event.target == edit_cat_modal) {
      edit_cat_modal.style.display = "none";
      let error_cat = document.getElementById('error-cat')
      error_cat.style.display = 'none';
      getCategory()
  }
}

function modifyCategory(){
  var table_cat = document.getElementById("category"), index;
  for ( var i = 0; i < table_cat.rows.length; i++){
    table_cat.rows[i].onclick = function(){
      index = this.rowIndex;
      cat_id = this.cells[0].innerHTML;
      document.getElementById('edit-catID').value = this.cells[0].innerHTML;
      document.getElementById('edit-catName').value = this.cells[1].innerHTML;

      if(cat_id){
        // Get the whole edit role modal
        var edit_cat_modal = document.getElementById('edit_catModal');
        edit_cat_modal.style.display = "block"
        }
    }
  } 
}

var cat_form = document.getElementById('cat-form');
  if(cat_form){
  cat_form.addEventListener('submit', Category);
  }

  function Category(e){
    e.preventDefault();

    let cat_name = document.getElementById('edit-catName').value;
    let cat_id = document.getElementById('edit-catID').value;

    fetch(`https://my-store-manager-api.herokuapp.com/api/v2/category/${cat_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, test/plain, */*',
        'Content-type': 'application/json',
        "Authorization": access_token
      },
      body: JSON.stringify({name:cat_name})
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((data) => {
          let error_cat = document.getElementById('error-cat')
          error_cat.style.display = 'block';
          error_cat.style.color = 'red';
          if(data.message == `Category id ${cat_id} is invalid`){
          error_cat.innerHTML= data.message;      
          }
          if(data.message == `Invalid category name ${cat_name}`){
            error_cat.innerHTML= data.message;      
            }
          if(data.message == `Category ${cat_name} already exist`){
          error_cat.innerHTML= data.message;      
          }
          if(data.message == `Category id ${cat_id} successfuly modified`){
            error_cat.style.color = 'green';
            error_cat.innerHTML= data.message;
            setCategory()
            }
          if(data.msg == "Token has expired"){
            error_cat.innerHTML= 'Session has expired kindly login again'
          }
    })
    .catch((err) => console.log(err))
  }

// editcat-modal cancel-btn
var view_cat = document.getElementById('view-cat');
if(view_cat){
  view_cat.addEventListener('click', getCategory);
}

// END PUT category**************************************************************************************

// GET all categories into POST product form ************************************************************

function setCategory(){
  fetch('https://my-store-manager-api.herokuapp.com/api/v2/category', {
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
    let all_categories = `<option value="choice">Select Category:</option> `;
    if(data.message == 'No categories'){

      document.getElementById('cat-choice').innerHTML = all_categories;
    }
    else{
    data['Categories'].forEach(function(category){
      all_categories +=  `
                        <option value="${category.id}">${category.name}</option>
                `;
              });
      document.getElementById('cat-choice').innerHTML = all_categories;
    }
  })
  .catch((err) => console.log(err))
}


// END GET category into POST product form **************************************************************



// POST product ****************************************************************************************
var product_form = document.getElementById('add-product');
if(product_form){
  product_form.addEventListener('submit', postProduct);

}

function clear_productForm(){
  product_form.reset();
}

function postProduct(e){
  e.preventDefault();

  let product_name = document.getElementById('product-name').value;
  let product_price = document.getElementById('product-price').value;
  let product_quantiry = document.getElementById('product-quantity').value;
  let product_min_quantity = document.getElementById('product-min-quantity').value;
  let product_cat = document.getElementById('cat-choice').value;

  const data_product = {
    "name": product_name,
    "price": product_price,
    "quantity": product_quantiry,
    "min_quantity": product_min_quantity,
    "category_id": product_cat
  }

  fetch('https://my-store-manager-api.herokuapp.com/api/v2/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, test/plain, */*',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": access_token
    },
    body: JSON.stringify(data_product)
  })
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((data) => {
    let error_product = document.getElementById('error-product')
    error_product.style.display = 'block';
    error_product.style.color = 'red';
    if(data.message == "Invalid product name"){
      error_product.innerHTML= data.message;
    }
    if(data.message == "Invalid product price"){
      error_product.innerHTML= data.message;
    }
    if(data.message == "Invalid product quantity"){
      error_product.innerHTML= data.message;
    }
    if(data.message == "Invalid product minimum quantity"){ 
      error_product.innerHTML= data.message;
    }
    if(data.message == "Invalid product category id"){ 
      error_product.innerHTML= data.message;
    }
    if(data.message == `Product ${product_name} already exist`){
      error_product.innerHTML= data.message;
    }
    if(data.message == `Product created successfully`){
      error_product.style.color = 'green';
      error_product.innerHTML= data.message;
      getProducts()
    }
    if(data.msg == "Token has expired"){
      error_product.innerHTML= 'Session has expired kindly login again'
    }
    
  })
  .catch((err) => console.log(err))
}

// END POST product**********************************************************************************


// GET Products **************************************************************************************
var view_users = document.getElementById('view-users');
if(view_users){
  view_users.addEventListener('click', getUsers);
}


function getProducts(){
  fetch('https://my-store-manager-api.herokuapp.com/api/v2/products', {
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
    let no_products = document.getElementById('no-products')
    if(data.message == 'No products'){
      no_products.style.display = 'block';
      no_products.innerHTML= data.message; 
    }
    else{
    no_products.style.display = 'none';
    let all_products = `
                <th>ID</th>
                <th>Name</th>
                <th>Category ID</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Min quantity</th>
                <th>Action</th>
                      `;
    data['Products'].forEach(function(product){
      all_products +=  `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category_id}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.min_quantity}</td>
            <td>
                <div class="modify-btn">
                <button id="edit-btn" class="edit-btn">modify</button>
                <button class="delete-btn" onclick="deleteProduct()">delete</button>
                </div>
            </td>
        </tr>
      `;
    });
    document.getElementById('products').innerHTML = all_products;
    }
  })
  .catch((err) => console.log(err))
}

// END GET Products  **********************************************************************************


// DELETE a product  ************************************************************************************
function deleteProduct(){
  var table_product = document.getElementById("products");
  for ( var i = 0; i < table_product.rows.length; i++){
    table_product.rows[i].onclick = function(){

      product_id = this.cells[0].innerHTML;

      fetch(`https://my-store-manager-api.herokuapp.com/api/v2/products/${product_id}`, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": access_token
        }
      })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        let no_products = document.getElementById('no-products')
        no_products.style.color = 'red';
        no_products.style.display = 'block'
        if(data.message == `Product id ${product_id} is invalid`){
          no_products.innerHTML= data.message; 
        }
        if(data.message == `Product id ${product_id} not found`){
          no_products.innerHTML= data.message; 
        }
        if(data.message == `Product id ${product_id} successfuly deleted`){
          for(var i = table_product.rows.length - 1; i > -1; i--){
              table_product.deleteRow(i);
              }
          no_products.style.color = 'green';
          no_products.innerHTML= data.message;
          getProducts()
        }
        if(data.msg == "Token has expired"){
          no_products.innerHTML= 'Session has expired kindly login again'
        }
        
      })
      .catch((err) => console.log(err))
    }
  }
}

// END DELETE a product ********************************************************************************

// run showContainer function
showContainer()

