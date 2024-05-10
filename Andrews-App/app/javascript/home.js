

function blur_body(time="1s") {
  var body = document.getElementsByClassName("main_page")[0]
  body.style.transition = time
  body.style.opacity = "20%"
}

function unblur_body(time="1s") {
  var body = document.getElementsByClassName("main_page")[0]
  body.style.transition = time
  body.style.opacity = "100%"
}

/* Open when someone clicks on the span element */
function openNav() {
  var nav = document.getElementById("myNav")
  nav.style.width = "20%";
  blur_body()
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  var nav = document.getElementById("myNav")
  nav.style.width = "0%"
  unblur_body()
}




nav_link = document.getElementsByClassName("Nav_link")[0];
nav_link.onclick = openNav;



var navbar = document.getElementsByClassName("top_bar")[0];
var hamburger = document.getElementsByClassName("hamburger")[0];

hamburger.onclick = function() {
  if (navbar.style.position === "fixed") {
      navbar.style.position = "absolute";
      hamburger.innerHTML = "&#8801;"}
  else {
      navbar.style.position = "fixed";
      hamburger.innerHTML = "&times;"
  }
};




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("open_modal")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  blur_body("0s");
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  unblur_body("0s");
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
  unblur_body("0s");
  modal.style.display = "none";
}
}



