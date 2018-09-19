// this will get the express engine to work for our server
const express = require("express");
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

//this will require any or all models I use
var db = require("./models");

//this will turn on the express engine 
var app = express();


