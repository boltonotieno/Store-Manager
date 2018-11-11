   // Access token from login
   const token = localStorage.getItem('access_token')
   const current_user = localStorage.getItem('current_user')
   const access_token = "Bearer " + token

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
 
}
// Windows on load ***************************************************************