const db = require("../config/db");

class LikeComment {
    constructor(commentId, userId, postId, createdAt) {
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.createdAt = createdAt;
    }
}

LikeComment.create = (likeComment) => {
    return new Promise((success, reject) => {
        db.query("INSERT INTO comments_likes SET ?", likeComment, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

LikeComment.getForComment = (commentId) => {
    return new Promise((success, reject) => {
        db.query("SELECT * FROM comments_likes WHERE commentId = ?", commentId, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

LikeComment.delete = (id) => {
    return new Promise((success, reject) => {
        db.query("DELETE FROM comments_likes WHERE id = ?", id, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

module.exports = LikeComment;
