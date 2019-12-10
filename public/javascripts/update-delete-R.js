// Get all the modals with the class name "modal"
var modals = document.getElementsByClassName("modal");

// Get all edit buttons that opens a modal
var editBtn = document.getElementsByClassName("editBtn");



var deleteModals = document.getElementsByClassName("delete-modal");

var deleteBtn = document.getElementsByClassName("deleteBtn");

var cancelBtn = document.getElementsByClassName("btnCancel");



// Loop through all the buttons and add event listener to each of them
// that opens the modal with the same index

for( let i = 0; i < editBtn.length; i ++){

	editBtn[i].addEventListener("click", function(){
    	// console.log(modals[i]);
    	modals[i].style.display = "block";

    } );

    deleteBtn[i].addEventListener("click", function() {

    	deleteModals[i].style.display = "block";
    })
}


for(let i=0; i <cancelBtn.length; i++) {
	cancelBtn[i].addEventListener("click", function() {
		deleteModals[i].style.display = "none";
	})
}

// Get the <span> element that closes a modal
var spans = document.getElementsByClassName("close");

var deleteSpans = document.getElementsByClassName("delete-close");


// Loop through all the spans and add event listener to each of them
// that closes the modal with the same index
for(let i= 0; i <spans.length; i ++) {

	spans[i].addEventListener("click", function(){
		modals[i].style.display = "none";
	});

	deleteSpans[i].addEventListener("click", function(){
		deleteModals[i].style.display = "none";
	});
}



// Add counter for newly added ingredients. The reason is such a 
//high number is to avoid the same id's between other recipes ingredients
//in the same page. 

let counter = 200;

// Add new ingredient fields

function addIngrFields(element){

	counter++;

	let newdiv = document.createElement('div');

	newdiv.id = counter;

	let deleteBtn = '<a style="text-align:right; margin-right:50px; background-color: #ffb84f; color: white; text-decoration: none; padding: 8px 10px; display: inline-block;" href="javascript:deleteExistingFields('+ counter +')">Delete</a>';

	newdiv.innerHTML = document.getElementById('addIngrTemplate').innerHTML + deleteBtn;


	//give new names to new ingredient fields 

	divChildren = newdiv.childNodes;

	for (var i=0; i < divChildren.length; i++) {

		divChildren[i].name = divChildren[i].name + counter; 
	}


	//add new ingredient fields (newdiv) to the 'addNewIngredients' div 
	//that has a unique id depending on the recipe

	let parent = document.getElementsByClassName('addNewIngredients')

	for(var i=0; i<parent.length; ++i) {

		if(parent[i].id === element.id){
			parent[i].appendChild(newdiv)
		}
	}
}

// Remove ingredient fields

function deleteExistingFields(eleId) {

	d = document;
	let ele = d.getElementById(eleId);
	let parentEle = d.getElementsByClassName('addNewIngredients')
	console.log(ele);
	for(var i=0; i<parentEle.length; ++i){
		if(parentEle[i].contains(ele)){
			parentEle[i].removeChild(ele);
		}
	}
}