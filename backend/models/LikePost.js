const db = require("../config/db");

class LikePost {
    constructor(postId, userId, createdAt) {
        this.postId = postId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}

LikePost.create = (likePost) => {
    return new Promise((success, reject) => {
        db.query("INSERT INTO posts_likes SET ?", likePost, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

LikePost.getForPost = (postId) => {
    return new Promise((success, reject) => {
        db.query("SELECT * FROM posts_likes WHERE postId = ?", postId, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

LikePost.delete = (id) => {
    return new Promise((success, reject) => {
        db.query("DELETE FROM posts_likes WHERE id = ?", id, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

module.exports = LikePost;
