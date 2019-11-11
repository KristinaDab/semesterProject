// Get all the modals with the class name "modal"
var modals = document.getElementsByClassName("modal");

// Get all edit buttons that opens a modal
var editBtn = document.getElementsByClassName("editBtn");

// Loop through all the buttons and add event listener to each of them
// that opens the modal with the same index
for( let i = 0; i < editBtn.length; i ++){
    editBtn[i].addEventListener("click", function(){
    	// console.log(modals[i]);
      	 modals[i].style.display = "block";
		
    } );
}

// Get the <span> element that closes a modal
var spans = document.getElementsByClassName("close");

// Loop through all the spans and add event listener to each of them
// that closes the modal with the same index
for(let i= 0; i <spans.length; i ++) {
	spans[i].addEventListener("click", function(){
		modals[i].style.display = "none";
	});
}


