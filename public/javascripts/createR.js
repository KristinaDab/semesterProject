//Script for adding the ingredient fields and deleting the ingredient fields in the "create recipe" form

let counter = 0;

// add another ingredient field 

function addIngrFields(){

	counter++;

	let newdiv = document.createElement('div');

	newdiv.id = counter;

	let deleteBtn = '<a style="text-align:right; margin-right:50px; background-color: #ffb84f; color: white; text-decoration: none; padding: 8px 10px; display: inline-block;" href="javascript:deleteFields('+ counter +')">Delete</a>';

	newdiv.innerHTML = document.getElementById('addIngrTemplate').innerHTML + deleteBtn;


	//give new names to new ingredient fields 

	divChildren = newdiv.childNodes;

	for (var i=0; i < divChildren.length; i++) {

		divChildren[i].name = divChildren[i].name + counter; 
	}


	//add new ingredient fields (newdiv) to the 'addNewIngredients' div

	document.getElementById('addNewIngredients').appendChild(newdiv);
}


// delete fields 

function deleteFields(eleId) {

	d = document;
	let ele = d.getElementById(eleId);
	let parentEle = d.getElementById('addNewIngredients');
	parentEle.removeChild(ele);
}

