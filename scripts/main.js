// nav bar functions
function openNav() {
    document.getElementById("main-sidebar").style.width = "250px";
    document.getElementById("openbtn").style.visibility = "hidden";
    document.getElementById("sidebar-icon").style.visibility = "visible";
    if (document.documentElement.clientWidth <= 900) {
        document.getElementById("main").style.marginLeft = "250px";
    }
}

function closeNav() {
    document.getElementById("main-sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("openbtn").style.visibility = "visible";
    document.getElementById("sidebar-icon").style.visibility = "hidden";
}