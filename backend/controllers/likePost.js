const LikePost = require("../models/LikePost");

exports.like = (req, res) => {
    const likePost = new LikePost(
        (postId = req.body.postId), 
        (userId = req.headers.userid), 
        (createdAt = new Date())
    )
    LikePost.create(likePost)
    .then(data => {
        res.status(200).json(data.insertId);
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

exports.getLikes = (req, res) => {
    LikePost.getForPost(req.params.postId)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json(err);
    })
}

exports.getUserLikes = (req, res) => {
    LikePost.getForUser(req.params.userId)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json(err);
    })
}

exports.dislike = (req, res) => {
    LikePost.delete(req.params.id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json(err);
    })
}