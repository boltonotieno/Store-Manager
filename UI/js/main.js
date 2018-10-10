// Get the element with id="default" and click on it
document.getElementById("default").click()

function showContainer(evt, sectionID) {
    // Declare all variables
    var i, dashboardcontainer, tablink;

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


showContainer()

