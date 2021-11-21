const db = require("../config/db");

class User {
  constructor(
    email,
    password,
    firstName,
    lastName,
    imageUrl,
    position,
    description,
    createdAt,
    updatedAt
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.position = position;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

User.create = (user) => {
  return new Promise((success, reject) => {
    db.query(`INSERT INTO users SET ?`, user, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

User.update = (params, id) => {
  return new Promise((success, reject) => {
    db.query(`UPDATE users SET ? WHERE id = ${id}`, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

User.getAuth = (email) => {
  return new Promise((success, reject) => {
    db.query(
      `SELECT * FROM users WHERE email = ?`,
      email,
      (err, res) => {
        if (err || res == "") {
          reject(err || "Utilisateur introuvable !");
        } else {
          success(res);
        }
      }
    );
  });
};

User.getPassword = (id) => {
  return new Promise((success, reject) => {
    db.query(
      `SELECT password FROM users WHERE id = ?`,
      id,
      (err, res) => {
        if (err || res == "") {
          reject(err || "Utilisateur introuvable !");
        } else {
          success(res);
        }
      }
    );
  });
};

User.getProfiles = () => {
  return new Promise((success, reject) => {
    db.query(
      "SELECT id, email, firstName, lastName, imageUrl, position, description, createdAt, updatedAt FROM users;",
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

User.getProfile = (id) => {
  return new Promise((success, reject) => {
    db.query(
      "SELECT id, email, firstName, lastName, imageUrl, position, description, createdAt, updatedAt FROM users WHERE id = ?;",
      id,
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

User.delete = (id) => {
  return new Promise((success, reject) => {
    db.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        success(res);
      }
    });
  });
};

module.exports = User;
