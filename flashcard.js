// JS Code for Flashcard-Generator, created by Connor Hoy and Austin I.

// Requires packages.
var type = process.argv[2];
var inquirer = require("inquirer");
var fs = require("fs");

// Basic Flashcard Constructor.
var BasicFlashcard = function(front, back) {
	this.front = front;
	this.back  = back;
};

// Cloze Flashcard Constructor.
var ClozeFlashcard = function(text, cloze){
	this.text  = text
	this.cloze = cloze
	this.print = function(){
		console.log(cloze);
	}
};

// Runs questions through inquirer.
if(type === "create") {
	inquirer.prompt([
	{
		type: "confirm",
		message: "Hello, Welcome to my flashcard creator! Are you ready to begin?",
		name: "welcome" 
	},

	{
		type: "input",
		message: "Enter the front of your flashcard! (The question)",
		name: "front"	
	},

	{
		type: "input",
		message: "Enter the back of your flashcard! (The answer)",
		name: "back"
	}

// Takes users responses and appends them to the file 'CreatedCards.txt'.
]).then(function(user){
	fs.appendFile("CreatedCards.txt",
		user.front +"  " + user.back + ",  ", function(err){
			if (err){
				console.log(err);
			}
			console.log("Card added!");
		})

})
}

// Runs the game, prompting the user.
else if (type === "play"){
	fs.readFile("CreatedCards.txt", "utf8", function(err, data){
		if (err){
			console.log(err)
		}

		var pulledData = data.split("  ")
		console.log(" " + pulledData[2]);	
		inquirer.prompt({
			type: "input",
			message: "Enter your answer.",
			name: "enter"
		}).then(function(user){
			var answer = user.enter + ",";
			if(answer === pulledData[3]) {
				console.log("Correct!")
			}
			else{
				console.log("Incorrect!")
			}
		})
	})
}
