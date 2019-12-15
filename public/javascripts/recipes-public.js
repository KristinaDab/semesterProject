// Script for collapsible buttons in the recipe page. It is looping through
// all collapsible buttons and adding an event listener "click"
// If the content is visible- on click don't show the content and v.v.

var coll = document.getElementsByClassName("collapsibleBtn");
var i;

for (i = 0; i < coll.length; i++) {

  coll[i].addEventListener("click", function() {

    this.classList.toggle("activeCollapse");

    var content = this.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}