require("dotenv").config();

//Require data from File System npm package
var fs = require("fs");


//Requiring function exported from js files
var mySpotify = require("./spotify.js");

var myMovies = require("./movie.js");

var myConcert = require("./bands.js");

//Creates initial user command
var userCommand=process.argv[2];
//Creates user input
var userInput=process.argv.splice(3,process.argv.length).join(' ');


//Program conditions 
switch (userCommand) {
    case "concert-this":
        myConcert(userInput);
        break;
    case "spotify-this-song":
        mySpotify(userInput);
        break;
    case "movie-this":
        myMovies(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break
};


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        //Return if any errors
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        
        // Each command is represented. Because of the format in the txt file, remove quotes to run these commands. 
        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            console.log("Song Check: "+ songcheck)
            mySpotify(songcheck);
        } else if (dataArr[0] === "concert-this") {
            var venueName = dataArr[1].slice(1, -1);
            console.log("Venue Name: "+ venueName)
            myConcert(venueName);
        } else if(dataArr[0] === "movie-this") {
            var movieName = dataArr[1].slice(1, -1);
            console.log("Movie Name: "+ movieName)
            myMovies(movieName);
        }
    });
};