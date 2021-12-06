ReadMe:

Description:
Find the duck:
Find the duck is a fast-paced where is waldo-esc game where a duck will be placed on a randomly selected image pulled from bings-image search api.
The goal is to be as fast as possible / be the first to locate and click on the duck to gain points. 
Every wrong click will punish the player by reducing points to avoid a spam-clicking-meta.

What have you done?:
We have produced a working prototype with randomly selected images with a minimalistic CSS. 
The game tracks score and swaps image if the player find the duck or the time runs out.
A login system has also been implemented with Firebase, which holds User email- password and provides a unique userID.


What do you plan on doing?:
We still plan to implement a highscore list that tracks the top -logged in players overall score and holds information with firebase.
Settings page with volume control for eventual game music, game controls and how to play tutorial.
We plan on improving on the CSS to make a more user-friendly interface with good user feedback and eventually CSS-animations.
If possible we plan on making a instanced game lobby with a custom url that will make multiplayer with friends possible.

-Dh-test
	-.gitignore
	-Style.css - General css styles.
	-src
		- firebase
			-firebase.config: holds api configs and imports/exports auths.
			-firebaseModel.js: Database functions to take in and hold values.
		- presenters: All respective functions for their Presenter page.
			- gamePresenter.jsx.
			- indexPresenter.jsx
			- loginPresenter.jsx
			- registerPresenter.jsx
			- mainPagePresenter.jsx
			- navBarPresenter.jsx
		- models
			- model.js: Observer and highscore struct.
	
		- views : holds all respective page layouts.
			- gameView.jsx
			- index.jsx
			- login.jsx
			- mainPage.jsx
			- navbar.jsx
			- register.js
			- timerView.jsx
		- app.js
		-index.js
		-apiconfig.js: holds api key and base url.

