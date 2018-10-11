//Needs mongoose to work
const mongoose = require("mongoose");
// Make it easier by calling it all Schema
const Schema = mongoose.Schema;

// Create a new Schema from scraped data
const ArticleSchema = new Schema ({

    headline: {
        type: String,
        required: true
    },
    
    link: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"

    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;