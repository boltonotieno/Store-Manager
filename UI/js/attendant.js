   // Access token from login
   const token = localStorage.getItem('access_token')
   const current_user = localStorage.getItem('current_user')
   const access_token = "Bearer " + token

  // check if token exist during load
  if (token === null){
    redirect: window.location.replace("./index.html")
  }

// Set username on topnav
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

    //  get attendant sales on load 
    getSales()
 
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
      if(data.msg == "Token has expired"){
        alert('Session has expired kindly login again')
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
        alert("Logout Successful");
      })
      .catch((err) => console.log(err))
}

// End LOGOUT attendant ******************************************

// Set product details in sales form ********************************************************************
var search_prod = document.getElementById('search-product');
  if(search_prod){
    search_prod.addEventListener('click', setProduct);
  }

function setProduct(){

    let product_id = document.getElementById('product-id').value;

    fetch(`https://my-store-manager-api.herokuapp.com/api/v2/products/${product_id}`, {
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
    let product_msg = document.getElementById('product-msg')
    product_msg.style.color = 'red';
      if(data.message == 'Product not Found'){
        product_msg.innerHTML = data.message;
      }
      if(data.message == `Product id ${product_id} is invalid`){
        product_msg.innerHTML = data.message;
      }
      if(data.message == `Product successfully retrieved`){
        product_msg.style.color = 'green';
        product_msg.innerHTML = data.message;
        document.getElementById('product-name').value = data['Product']['name'];
        document.getElementById('product-price').value = data['Product']['price'];
        cal_Amount()
      }
      if(data.msg == "Token has expired"){
        alert('Session has expired kindly login again')
      }
    })
    .catch((err) => console.log(err))
  }
  
  
  // END Set product details in sales form *****************************************************************
  

// POST Sales **********************************************************************************************
var sale_form = document.getElementById('sale-form');
if(sale_form){
  sale_form.addEventListener('submit', postSale);

}

function clear_saleForm(){
  sale_form.reset();
}

function cal_Amount(){
    let product_price = document.getElementById('product-price').value;
    let product_quantity = document.getElementById('product-quantity').value;
    let Amount = product_price * product_quantity
    document.getElementById('sale-total').value = Amount;
  }

function postSale(e){
  e.preventDefault();

  let product_name = document.getElementById('product-name').value;
  let product_price = document.getElementById('product-price').value;
  let product_quantity = document.getElementById('product-quantity').value;
  let attendant = current_user;

  const data_sale = {
    "name": product_name,
    "price": product_price,
    "quantity": product_quantity,
    "attendant": attendant
  }

  fetch('https://my-store-manager-api.herokuapp.com/api/v2/sales', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, test/plain, */*',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": access_token
    },
    body: JSON.stringify(data_sale)
  })
  .then((res) => res.json())
//   .then((data) => console.log(data))
  .then((data) => {
    let product_msg = document.getElementById('product-msg')
    product_msg.style.color = 'red';
    if(data.message == "Invalid product quantity"){
        product_msg.innerHTML= data.message;
    }
    if(data.message == "Invalid product name"){
        product_msg.innerHTML= data.message;
    }
    if(data.message == `Product quantity is more than available inventory quantity`){
        product_msg.innerHTML= data.message;
    }
    if(data.message == `Product quantity will go below the minimum quantity allowed`){
        product_msg.innerHTML= data.message;
    }
    if(data.message == "Product has reached the minimum quantity"){ 
        product_msg.innerHTML= data.message;
    }
    if(data.message == `Sales created successfully`){
        product_msg.style.color = 'green';
        product_msg.innerHTML= data.message;
        getSales()
        getProducts()
        clear_saleForm()
    }
    if(data.msg == "Token has expired"){
        alert('Session has expired kindly login again')
    }
  })
  .catch((err) => console.log(err))
}

// END POST Sales**********************************************************************************

// filter sale by id
  function saleFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("saleInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("sales");
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

  
// GET all attendant sales ***********************************************************************************

function getSales(){
    fetch('https://my-store-manager-api.herokuapp.com/api/v2/sales', {
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
      let no_sales = document.getElementById('no-sales')
      if(data.message == 'You have no sales'){
        no_sales.style.display = 'block';
        no_sales.innerHTML= data.message; 
      }
      else{
      no_sales.style.display = 'none';
            let all_sales = `
                        <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Creator</th>
                        </tr>
                        `;
      data['Sales'].forEach(function(sale){
        all_sales +=  `
          <tr>
              <td>${sale.id}</td>
              <td>${sale.name}</td>
              <td>${sale.price}</td>
              <td>${sale.quantity}</td>
              <td>${sale.total_price}</td>
              <td>${sale.attendant}</td>
          </td>
          </tr>
        `;
      });
      document.getElementById('sales').innerHTML = all_sales;
      }
    })
    .catch((err) => console.log(err))
  }
  
  // END GET all attendant sales *************************************************************************
  