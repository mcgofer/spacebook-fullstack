var mongoose = require('mongoose');

//design the two schema below and use sub docs 
//to define the relationship between posts and comments

//you don't need a comments collection
//you only need a posts collection

var commentSchema = new mongoose.Schema({
    text: String,
    user: String
});

var Comment = mongoose.model('comment', commentSchema);

var postSchema = new mongoose.Schema({
    text: String,
    comments: [commentSchema]
});

var Post = mongoose.model('post', postSchema);

var heyPost = new Post({ text: 'hey'});
heyPost.save();
heyPost.comments.push({ text: 'hey', user: 'mc' });

module.exports = Post;