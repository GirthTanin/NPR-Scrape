// Needs mongoose to work
const mongoose = require("mongoose");
// make it easier by making it "Schema"
const Schema = mongoose.Schema;
// make a new schema
const CommentSchema = new Schema ({
    title: String,
    body: String
});

const Comment = mongoose.model("COmment", CommentSchema);

module.exports = Comment;