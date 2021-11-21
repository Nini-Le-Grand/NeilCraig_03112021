const Comment = require("../models/Comment");

exports.create = (req, res) => {
  const comment = new Comment(
    (userId = req.headers.userid),
    (postId = req.body.postId),
    (message = req.body.message),
    (createdAt = new Date()),
    (updatedAt = new Date())
  )
  Comment.create(comment)
  .then(data => {
    let resComment = comment;
    resComment.id = data.insertId;
    res.status(201).json(resComment)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

exports.getPost = (req, res) => {
  Comment.getPost(req.params.postId)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

exports.delete = (req, res) => {
  Comment.delete(req.params.id)
  .then(data => {
    res.status(203).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}