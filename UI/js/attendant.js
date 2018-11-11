   // Access token from login
   const token = localStorage.getItem('access_token')
   const current_user = localStorage.getItem('current_user')
   const access_token = "Bearer " + token

  // check if token exist during load
  if (token === null){
    redirect: window.location.replace("./index.html")
  }


function setUserName(){
  document.getElementById('current-user').innerHTML = current_user;
}

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

    //  set username
     setUserName()
     
    //  get all products on load 
    getProducts()

    //  get all categories on load 
    getCategory()
 
}
// Windows on load ***************************************************************

// filter product by name
function productFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("productInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("view-products");
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


// GET Products  **********************************************************************************

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
          </tr>
        `;
      });
      document.getElementById('view-products').innerHTML = all_products;
      }
    })
    .catch((err) => console.log(err))
  }
  
  // END GET Products  **********************************************************************************
 

  // filter category by name
function categoryFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("categoryInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("category");
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

  
// GET all categories ***********************************************************************************

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
//   .then((data) => console.log(data))
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
                      </tr>
                      `;
    data['Categories'].forEach(function(category){
      all_categories +=  `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
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

// LOGOUT attendant **********************************************
var logout_attendant = document.getElementById('logout-attendant');
if(logout_attendant){
  logout_attendant.addEventListener('click', logoutAttendant);
}

function logoutAttendant(){
    fetch('https://my-store-manager-api.herokuapp.com/api/v2/auth/logout', {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": access_token
        }
      })
      .then((res) => res.json())
    //   .then((data) => console.log(data))
      .then((data) => {
        localStorage.removeItem('access_token');
        if(data.msg == 'Token has expired'){
            redirect: window.location.replace("./index.html")
          }
        if(data.message == 'Logged out succesful'){
            redirect: window.location.replace("./index.html")
        }
      })
      .catch((err) => console.log(err))
}

// End LOGOUT attendant ******************************************
