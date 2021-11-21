const db = require("../config/db");

class Post {
  constructor(userId, title, message, imageUrl, createdAt, updatedAt) {
    this.userId = userId;
    this.title = title;
    this.message = message;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

Post.create = (post) => {
  return new Promise((success, reject) => {
    db.query(`INSERT INTO posts SET ?`, post, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

Post.update = (params, id) => {
  return new Promise((success, reject) => {
    db.query(`UPDATE posts SET ? WHERE id = ${id}`, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

Post.get = () => {
  return new Promise((success, reject) => {
    db.query("SELECT * FROM posts ORDER BY updatedAt DESC;", (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

Post.getFromUser = (userId) => {
  return new Promise((success, reject) => {
    db.query(
      `SELECT * FROM posts WHERE userId = ${userId} ORDER BY updatedAt DESC;`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          success(res);
        }
      }
    );
  });
};

Post.delete = (id) => {
  return new Promise((success, reject) => {
    db.query(`DELETE FROM posts WHERE id = ?`, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

module.exports = Post;
