const db = require("../config/db");

class Comment {
  constructor(userId, postId, message, createdAt, updatedAt) {
    this.userId = userId;
    this.postId = postId;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};

Comment.create = (comment) => {
  return new Promise((success, reject) => {
      db.query(`INSERT INTO comments SET ?`, comment, (err, res) => {
          if(err) {
              reject(err);
          }
          else {
              success(res);
          }
      })
  })
};

Comment.update = (params, userId) => {
  return new Promise((success, reject) => {
      db.query(`UPDATE comments SET ? WHERE userId = ${userId}`, params, (err, res) => {
          if(err) {
              reject(err);
          }
          else {
              success(res);
          }
      });
  });
};

Comment.getPost = (postId) => {
  return new Promise((success, reject) => {
      db.query("SELECT * FROM comments WHERE postId = ? ORDER BY updatedAt ASC;", postId, (err, res) => {
          if(err) {
              reject(err);
          }
          else {
              success(res);
          }
      })
  }) 
};

Comment.getOne = (idComments) => {
  return new Promise((success, reject) => {
      db.query("SELECT * FROM comments WHERE userId = ?;", idComments, (err, res) => {
          if(err) {
              reject(err);
          }
          else {
              success(res);
          }
      })
  }) 
};

Comment.delete = (id) => {
  return new Promise((success, reject) => {
      db.query(`DELETE FROM comments WHERE id = ?`, id, (err, res) => {
          if(err) {
              reject(err);
          }
          else {
              success(res);
          }
      });
  });
};

module.exports = Comment;