const LikeComment = require("../models/LikeComment");

exports.like = (req, res) => {
  const likeComment = new LikeComment(
    (commentId = req.body.commentId),
    (userId = req.headers.userid),
    (postId = req.body.postId),
    (createdAt = new Date())
  );
  LikeComment.create(likeComment)
    .then((data) => {
      res.status(200).json(data.insertId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getLikes = (req, res) => {
    console.log(req.params.commentId);
  LikeComment.getForComment(req.params.commentId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.dislike = (req, res) => {
  LikeComment.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
