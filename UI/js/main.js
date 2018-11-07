// Get the element with id="default" and click on it
document.getElementById("default").click()

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

    document.getElementById(sectionID).style.display = "block";
    evt.currentTarget.className += " active";  
}

 function clickFunction() {
     // Get the element with id="default" and click on it
     document.getElementById("default").click();
 }

// Get the whole modal
var modal = document.getElementById('editModal');

// Get the button that opens the modal i.e edit-btn
var btn = document.getElementById("edit-btn");

// Get the <span> element that closes the modal i.e the x symbol
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button((edit-btn), open the modal (editModal)
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
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

// run showContainer function
showContainer()
