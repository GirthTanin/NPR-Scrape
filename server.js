// this will get the express engine to work for our server
const express = require("express");
// I need all the credit I can get.
const handlerbars = require("express-handlebars");
// this will use Body Parser to parse incoming request bodies before the handlers, available under the req.body property
const bodyParser = require("body-parser");
// this will get Morgan (for the show Dexter) which is used for HTTP request logger middleware and is set up like: morgan(function (tokens, req, res) { etc. }
const morgan = require("morgan");
// this will set up mongoose to do all the database stuff for us
const mongoose = require('mongoose');

// trying to get in the habit of using ES6 lingo
const PORT = 3000; 


// this will make http requests from node.js and supports the Promise API, and automatic transforms for JSON data
const axios = require("axios");
// this will parse markup and provides an API for using and changing the resulting data structure.
const cheerio = require("cheerio");

// this will keep me from sharing too much
const dotenv = require("dotenv");

//this will require any or all models I use
var db = require("./models");

//this will turn on the express engine 
var app = express();

// use logger from morgan for logging requests
app.use(logger("dev"));

// body-pareser will handle form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));

// using express.static to serve the public folder as a static directory
app.use (express.static("public"));

// connecting to Mongo DB, but I'm not sure this will work just copying it...
mongoose.connect("mongodb://localhost/populate", {
    useNewUrlParser: true
});

// A GET route for scraping the NPR website
app.get("/scrape", function (req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function(response) {
        //then we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // I want to grab all the titles which are under h2.title on NPRs website
        $("h2.title").each(function(i, element) {
            //save them here {}
            var result = {};
            // adding the text and href of every line, saved as properties of the above object
            result.title = $(this)
            .children("a")
            .text();

            //creating each new article using the result {object} built from the scrape
            db.Article.create(result)
            .then(function(dbArticle) {
                //console.log this so I can see what is going on...
                console.log("dbArticle" + dbArticle);
            })
            .catch(function(err) {
                //the error will be sent to the client...and the console
                console.log("article.create error " + err);
                return res.json(err);
            });
        });
    });
});