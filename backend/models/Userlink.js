const db = require("../config/db");

class Userlink {
    constructor(
        userId,
        partnerId,
        createdAt
    ) {
        this.userId = userId;
        this.partnerId = partnerId;
        this.createdAt = createdAt;
    }
}

Userlink.create = (userlink) => {
    return new Promise((success, reject) => {
      db.query(`INSERT INTO users_users SET ?`, userlink, (err, res) => {
        if (err) {
          reject(err);
        } else {
          success(res);
        }
      });
    });
  };

Userlink.getlinks = (id) => {
  return new Promise((success, reject) => {
    db.query(`SELECT * FROM users_users WHERE userId = ${id}`, (err, res) => {
      if(err) {
          reject(err);
      } else {
          success(res);
      }
  })
  })
}

Userlink.getOne = (userId, partnerId) => {
    return new Promise((success, reject) => {
        db.query(`SELECT * FROM users_users WHERE userId = ${userId} AND partnerId = ${partnerId}`, (err, res) => {
            if(err) {
                reject(err);
            } else {
                success(res);
            }
        })
    })
}

  Userlink.delete = (id) => {
    return new Promise((success, reject) => {
      db.query(`DELETE FROM users_users WHERE id = ?`, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          success(res);
        }
      });
    });
  };

  Userlink.deleteUserFromUser = (userId) => {
    return new Promise((success, reject) => {
      db.query(`DELETE FROM users_users WHERE userId = ?`, userId, (err, res) => {
        if (err) {
          reject(err);
        } else {
          success(res);
        }
      });
    });
  };

  Userlink.deletePartnerFromUser = (partnerId) => {
    return new Promise((success, reject) => {
      db.query(`DELETE FROM users_users WHERE partnerId = ?`, partnerId, (err, res) => {
        if (err) {
          reject(err);
        } else {
          success(res);
        }
      });
    });
  };

  module.exports = Userlink;