var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB', function () {
    console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

// var heyPost = new Post({ text: 'hey' });
// heyPost.save();
// heyPost.comments.push({ text: 'hello', user: 'mc' });


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments

app.get("/posts", function (req, res) {
    Post.find((err, post) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } else {
            // send the list of all posts
            res.status(200).send(post);
        }
    });
});

// 2) to handle adding a post

app.post('/posts', function (req, res) {
    var postItem = new Post({
        text: req.body.text,
        comments: []
    });
    console.log(postItem);
    postItem.save(function (err, post) {
        if (err) throw err;
        res.send(post);
    });
});


// 3) to handle deleting a post

app.delete('/posts/:id', function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) throw err;
        res.send(post);
    });
});

// 4) to handle adding a comment to a post

app.post('/posts/:id/comments', function (req, res) {
    var comment = {
        text: req.body.text,
        user: req.body.user
    }

    Post.findById(req.params.id, function (err, post) {
        // if (err) throw err;
        post.comments.push(comment);
        post.save(function (err, post) {
            if (err) throw err;
            res.send(comment);
        });
    });
});

// 5) to handle deleting a comment from a post

app.delete('/posts/:postID/comments/:commentID', function (req, res) {
    var postID = req.params.postID;
    var commentID = req.params.commentID;
    Post.findById(postID, function (err, post) {
        post.comments.id(commentID).remove();
        post.save(function (err, post) {
            if (err) throw err;
            res.send(post);
        });
    });
});

//Listening port

app.listen(8000, function () {
    console.log("what do you want from me! get me on 8000 ;-)");
});