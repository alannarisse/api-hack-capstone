# Thinkful API Hack Capstone - Captain Cook recipe finder

This is a bot that helps the user find recipes in the Yummly API database. The results are found using two different API calls made to Yummly. 
User enters desired course, allergies, recipe name, allowed and excluded ingredients after which the bot returns a selection of recipes to choose from.

[> Try out the recipe finder here <](https://getrecipe.paancrafts.com/)

## Overview
Here's a short application user flow walkthrough. The screenshots present screens 320px wide, 768px wide and 1440px wide starting from left.

### Step 1
When the user arrives at the start page, the bot introduces itself and asks the user to define recipe search preferences. Course preferences are asked as the first search term. The user can skip this by pressing the 'Next' button.

![Recipe finder step 1](https://getrecipe.paancrafts.com/readme-img/step-1.jpg)

### Step 2
As the second step the user is asked to select allergy preferences. Again this is not mandatory and the user can skip this screen with 'Next'.

![Recipe finder step 2](https://getrecipe.paancrafts.com/readme-img/step-2.jpg)

### Step 3
As the third step the user is asked to define a recipe or meal name they are searching for. Again this is not mandatory and the user can skip this screen with 'Next'.

![Recipe finder step 3](https://getrecipe.paancrafts.com/readme-img/step-3.jpg)

### Step 4
As the fourth step the user is asked to define ingredients that are allowed in the recipe.The user can add/remove tags for allowed ingredients. The tags will not be mutable after the user has moved on to the next step. Again this is not mandatory and the user can skip this screen with 'Next'.

![Recipe finder step 4](https://getrecipe.paancrafts.com/readme-img/step-4.jpg)

### Step 5
As the fifth step the user is asked to define ingredients that are to be excluded from the recipe. The user can add/remove tags for excluded ingredients. The tags will not be mutable after the user has moved on to the next step. Again this is not mandatory and the user can skip this screen with 'Next'.

![Recipe finder step 5](https://getrecipe.paancrafts.com/readme-img/step-5.jpg)

### Step 6
This step can return two different views.

##### View 1 - the results page
If Yummly API has recipes listed with terms matching the user's entered preferences, the user will see a list of recipes under the chatbox. Then the user can click/tap on any of the returned results and that opens a lightbox view of the recipe with more detailed results and references to the original recipe source and Yummly recipe page. User can also share the recipe on their Facebook feed.

![Recipe finder results view](https://getrecipe.paancrafts.com/readme-img/results-view.jpg)
![Recipe finder recipe details lightbox](https://getrecipe.paancrafts.com/readme-img/select-recipe.jpg)

##### View 2 - no results
If Yummly has no recipes listed with defined preferences, the user is notified and they can start a new search by clicking on the 'Start new search' link at the end of the bot's last message.

![Recipe finder no results view](https://getrecipe.paancrafts.com/readme-img/no-results.jpg)


##### Technologies used: HTML5/CSS3/Javascript/jQuery


## a really great project