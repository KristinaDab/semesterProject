		var counter = 1;

		var newIngr;

		function addIngrFields(divName){

			counter++;

			var newdiv = document.createElement('div');

			newdiv.id = counter;

			var deleteLink = '<a style="text-align:right; margin-right:50px; background-color: orange; color: white; text-decoration: none; padding: 8px 10px; display: inline-block;" href="javascript:delIt('+ counter +')">Delete</a>';

			newdiv.innerHTML = '<input id="inputingredient" type="text" name="ingredient" placeholder="Ingredient" required> &nbsp Quantity: &nbsp <input id="inputquantity" type="text" name="quantity" placeholder="Quantity" required> &nbsp Unit: &nbsp <select id="listunit" required> <option value="grams">g</option> <option value="liters">l</option> <option value="milliliters">ml</option> <option value="pieces">pcs</option> <option value="tablespoons">tbsp</option> <option value="teaspoons">tsp</option> <option value="cups">cup</option> </select> ' + '&nbsp &nbsp'+ deleteLink;

			document.getElementById(divName).appendChild(newdiv);

			newIngr = divName;

		}

		function delIt(eleId) {

			d= document;
			var ele = d.getElementById(eleId);
			var parentEle = d.getElementById(newIngr);
			parentEle.removeChild(ele);
		}