// Predefined objects
const searchParameters = {
			 allergyOptions:  `<span id="checkboxlist">
												  <label><input type="checkbox" value="Dairy" class="allergy">Dairy</label>
											    <label><input type="checkbox" value="Egg" class="allergy">Egg</label>
											    <label><input type="checkbox" value="Gluten" class="allergy">Gluten</label>
											    <label><input type="checkbox" value="Peanut" class="allergy">Peanut</label>
											    <label><input type="checkbox" value="Seafood" class="allergy">Seafood</label>
											    <label><input type="checkbox" value="Sesame" class="allergy">Sesame</label>
											    <label><input type="checkbox" value="Soy" class="allergy">Soy</label>
											    <label><input type="checkbox" value="Sulfite" class="allergy">Sulfite</label>
											    <label><input type="checkbox" value="Tree Nut" class="allergy">Tree Nut</label>
											    <label><input type="checkbox" value="Wheat" class="allergy">Wheat</label>
											    <input type="button" value="NEXT" class="allergyButton">
										    </span>`,
					dietOptions:  `<span id="checkboxlist">
												  <label><input type="checkbox" value="Lacto vegetarian" class="diet">Lacto vegetarian</label>
											    <label><input type="checkbox" value="Ovo vegetarian" class="diet">Ovo vegetarian</label>
											    <label><input type="checkbox" value="Pescetarian" class="diet">Pescetarian</label>
											    <label><input type="checkbox" value="Vegan" class="diet">Vegan</label>
											    <label><input type="checkbox" value="Vegetarian" class="diet">Vegetarian</label>
											    <input type="button" value="NEXT" class="dietButton">
										    </span>`
}


// Startup variables
const API_URL = 'https://api.yummly.com/v1';
const APP_ID = '0163f367';
const APP_KEY = 'fe0abbd328e4ac7137fab9e9459fb9df';


let username;
let searchTerms;
let allowedIng;
let excludedIng;
let allergyVal;
let dietVal;


// Connect to the API
function searchAPI(searchTerms, allowedIng, excludedIng, allergyVal, dietVal) {
  const settings = {
    url: API_URL + '/api/recipes?_app_id=' + APP_ID + '&_app_key=' + APP_KEY + '&q=' + searchTerms + 
    '&requirePictures=true&allowedIngredient%5B%5D=' + allowedIng + '&excludedIngredient%5B%5D=' + excludedIng + 
    '&allowedAllergy%5B%5D=' + allergyVal + '&allowedDiet%5B%5D=' + dietVal,
    data: {
    	q: searchTerms,
    	allowedIngredient: allowedIng,
    	excludedIngredient: excludedIng,
    	allowedAllergy: allergyVal,
    	allowedDiet: dietVal
    },
    dataType: 'jsonp',
    type: 'GET',
    success: displayResults
  };

  $.ajax(settings);

}


// Select textarea placeholder value
function setPlaceholder(value) {
	let newPlaceholder = $('#js-user-message').attr('placeholder', value);
}


// Set new textarea placeholder value
function renderPlaceholder(value) {
	setTimeout(() => { setPlaceholder(value); }, 1900);
}


// Bot message
function botMessage(text) {
	$('#js-conversation').append(text)
											 .scrollTop($('#js-conversation').prop('scrollHeight'));
	$('.currentMessage').hide();
	$('.currentMessage').delay(1500).show('slide', 400);
	$('.currentMessage').removeClass('currentMessage');
}


// Get username
function getUsername() {
	let greeting = `<p class="currentMessage">
										<span class="bot">Chef Cook:</span>
										<span class="bot-message">Howdy partner! 
										I am captain Cook and ready to help. 
										What is your name?</span>
									</p>`;
	botMessage(greeting);
	renderPlaceholder('Type your name here...');
}

// Bot responds to user messages
function botAi(message) {
// Greet user and ask for desired recipe or meal name
	if (username === undefined) {
		username = message;
		let greetUser = `<p class="currentMessage">
											<span class="bot">Chef Cook:</span>
											<span class="bot-message">Hello ${username}, feeling hungry eh? 
											Let's get going then. Enter what kind of recipe are you looking 
											for separated with a comma in the text field below.<br>
										</p>`;
		botMessage(greetUser);
		renderPlaceholder('Spicy tomato soup ...');
// Ask for allowed ingredients
	} else if (username.length >= 1 && searchTerms === undefined) {
		searchTerms = message;
		searchTerms = searchTerms.toLowerCase().replace(/ /g, '+');
		console.log(searchTerms);
		let readyForAllowedIng = `<p class="currentMessage">
															  <span class="bot">Chef Cook:</span>
															  <span class="bot-message">Now please enter your preferred 
															  ingredients separated with a comma in the text field 
															  below.<br>
														  </p>`
		botMessage(readyForAllowedIng);
		renderPlaceholder('Garlic, sausage, cucumber...');
// Ask for excluded ingredients
	} else if (username.length >= 1 && searchTerms.length >= 1 && allowedIng === undefined) {
		allowedIng = message;
		let readyForExcludedIng = `<p class="currentMessage">
															  <span class="bot">Chef Cook:</span>
															  <span class="bot-message">And what about ingredients you don't like? 
															  Enter these as well separated with a comma in the textbox below 
															  just like before.</span>
														  </p>`
		botMessage(readyForExcludedIng);
		renderPlaceholder('Garlic, sausage, cucumber...');
		console.log(allowedIng);
// Call ask for allergies function
	} else if (excludedIng === undefined && searchTerms.length >=1) {
		excludedIng = message;
		console.log(excludedIng);
		checkForAllergies();
	}
}


// Get checked values
function getCheckedValues (targetClass, checkedValues, isAllergy, callback) {
	$('#js-conversation').on('click', '.' + targetClass + 'Button', () => {
		let targetChecked = '.' + targetClass + ':checked';
		let checkedArray = [];
//		let checked;
	
		$(targetChecked).each(function() {
			checkedArray.push($(this).val());
		});
		
//		checked = checkedArray.join(', ');
		
		if (checkedArray.length > 0) {
			checkedValues = checkedArray;
		} else {
			checkedValues = undefined;	
			
		}

		if (isAllergy) {
			allergyVal = checkedValues;
		} else {
			dietVal = checkedValues;
		}

		callback();
		return allergyVal;
		return dietVal;
	});
}


// Ask user about allergies
function checkForAllergies() {
	let checkAllergies = `<p class="currentMessage">
										<span class="bot">Chef Cook:</span>
										<span class="bot-message">Thanks, but what about allergies? 
										Press NEXT if you're done or no allergies apply.<br>
										${searchParameters.allergyOptions}</span>
									</p>`;
	botMessage(checkAllergies);
	getCheckedValues('allergy', allergyVal, true, checkForDiet);
}


// Ask user for diet preferences
function checkForDiet() {
	console.log(allergyVal);
	let checkDiet = `<p class="currentMessage">
										<span class="bot">Chef Cook:</span>
										<span class="bot-message">Grrreat but 
										are you on a diet? Press NEXT if you're
										done or no diets apply.<br>
										${searchParameters.dietOptions}</span>
									</p>`;
	botMessage(checkDiet);
	getCheckedValues('diet', dietVal, false, startingSearch);
}

// Notify the user that search has been started
function startingSearch() {
	console.log(dietVal);
	let startNotification = `<p class="currentMessage">
										<span class="bot">Chef Cook:</span>
										<span class="bot-message">Thanks for your patience.
										I have started the search and you'll see the 
										results below in a jiffy</span>
									</p>`;
	botMessage(startNotification);
	searchAPI();
}


// Render the result in html
function renderResult(result) {
	return `<div>
					<h2>${result.recipeName}</h2>
					<p><span>Rating: ${result.rating}</span><span>${result.totalTimeInSeconds}</span></p>
					<p>${result.ingredients}</p>
					<hr>
				 </div>`; 
}


// Display the results to user
function displayResults(data) {
	$('#js-results').html('<img style="margin-left:auto; margin-right:auto;" src="images/Loading_icon.gif">');
	console.log(data);
	const results = data.matches.map( (item, index) => renderResult(item) );
	setTimeout(() => { $('#js-results').html(results); }, 3500);
}


// Track user message submission
function sendUserMessage() {

	// User presses Enter key
	$('#js-user-message').keypress(event => {
		if (event.which == 13) {
			if ($('#js-checkbox').prop('checked')) {
				event.preventDefault();
				$('#js-user-submit').click();
			}
		}
	});

	// User clicks Send button
	$('#js-user-submit').click(event => {

		event.preventDefault();

		if (!$('#js-user-message').val().trim().length) {
			return false;
		} else {
			let newUserMessage = $('#js-user-message').val();

			$('#js-conversation')
				.append(`<p>
									<span class="username">You:</span>
									<span class="user-message">${newUserMessage}</span>
								</p>`)
				.scrollTop($('#js-conversation').prop('scrollHeight'));
			$('#js-user-message').val('');
			$('#js-user-message').attr('placeholder', '');

			botAi(newUserMessage);

		}
	});

}

// Create a function to present default recipes if nothing is entered
// Create a function for the case where the search has no results - Try to combine these

// Start your engines
function initBot() {
//	searchAPI('banana', 'cinnamon', 'desserts', showSearchResults);
	getUsername();
	sendUserMessage();
}

$(initBot);