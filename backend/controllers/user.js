const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const User = require("../models/User");
const Userlink = require("../models/Userlink");
const LikePost = require("../models/LikePost");
const LikeComment = require("../models/LikeComment");

exports.signin = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const d = new Date();
      const user = new User(
        (email = req.body.email),
        (password = hash),
        (firstName = req.body.firstName),
        (lastName = req.body.lastName),
        (imageUrl = ""),
        (position = ""),
        (description = ""),
        (createdAt = d),
        (updatedAt = d)
      );
      return user;
    })
    .then((user) => {
      User.create(user)
        .then((data) => {
          res.status(201).json(`Utilisateur ${data.insertId} créé !`);
        })
        .catch((err) => res.status(500).json(err.code));
    });
};

exports.login = (req, res) => {
  User.getAuth(req.body.email)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].password).then((valid) => {
        if (valid) {
          const token = jwt.sign(
            { userId: data[0].id },
            `${process.env.SECRET_TOKEN}`,
            { expiresIn: "1h" }
          );
          let isAdmin = false;
          if (data[0].isAdmin == 1) {
            isAdmin = true;
          }
          const response = {
            userId: data[0].id,
            token: token,
            isAdmin: isAdmin,
            email: data[0].email,
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            position: data[0].position,
            description: data[0].description,
            imageUrl: data[0].imageUrl,
          };
          res.status(200).json(response);
        } else {
          res.status(500).json({ error: "Mot de passe incorrect !" });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateProfile = (req, res) => {
  const body = JSON.parse(req.body.body);
  const params = {
    firstName: body.firstName,
    lastName: body.lastName,
    position: body.position,
    description: body.description,
    imageUrl: body.imageUrl,
    updatedAt: new Date(),
  };

  if (req.file) {
    setImageUrl = `${req.protocol}://${req.get("host")}/images/users/${
      req.file.filename
    }`;
    params.imageUrl = setImageUrl;
  }

  User.update(params, req.headers.userid)
    .then((data) => {
      if (req.file) {
        let croppedfile = body.imageUrl.split("3000/")[1];
        fs.unlink(`${croppedfile}`, () => {
          res.status(201).json({
            message: "Profil mis à jour !",
            body,
            imageUrl: setImageUrl,
          });
        });
      } else {
        res.status(201).json({ message: "Profil mis à jour !", body });
      }
    })
    .catch(() => {
      res.status(500).json({ err: "Echec de la mise à jour !" });
    });
};

exports.getProfiles = (req, res) => {
  User.getProfiles()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getProfile = (req, res) => {
  User.getProfile(req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.updatePassword = (req, res) => {
  User.getPassword(req.headers.userid)
    .then((data) => {
      bcrypt.compare(req.body.oldPassword, data[0].password).then((valid) => {
        if (valid) {
          bcrypt.hash(req.body.newPassword, 10).then((hash) => {
            const params = {
              password: hash,
            };
            User.update(params, req.headers.userid)
              .then((data) => {
                if (data) {
                  res
                    .status(201)
                    .json({ message: "Mot de passe utilisateur mis à jour !" });
                }
              })
              .catch(() =>
                res
                  .status(500)
                  .json({ error: "Echec de la mise à jour du mot de passe !" })
              );
          });
        } else {
          res.status(401).json({ error: "Mot de passe incorrecte !" });
        }
      });
    })
    .catch((err) => res.status(400).json(err));
};

exports.delete = (req, res) => {
  let filename = "";
  if (req.params.imageUrl) {
    filename = "images/users/" + req.params.imageUrl;
  }

  User.delete(req.headers.userid)
    .then(() => {
      Userlink.deleteUserFromUser(req.headers.userid)
        .then(() => {
          Userlink.deletePartnerFromUser(req.headers.userid)
            .then(() => {
              LikePost.deleteFromUser(req.headers.userid)
                .then(() => {
                  LikeComment.deleteFromUser(req.headers.userid)
                    .then(() => {
                      if (filename != "") {
                        fs.unlink(`${filename}`, () => {
                          res
                            .status(203)
                            .json({ message: "Utilisateur supprimé !" });
                        });
                      } else {
                        res
                          .status(203)
                          .json({ message: "Utilisateur supprimé !" });
                      }
                    })
                    .catch(() =>
                      res
                        .status(501)
                        .json({
                          error: "Echec de la suppression de l'utilisateur !",
                        })
                    );
                })
                .catch(() =>
                  res
                    .status(501)
                    .json({
                      error: "Echec de la suppression de l'utilisateur !",
                    })
                );
            })
            .catch(() =>
              res
                .status(501)
                .json({ error: "Echec de la suppression de l'utilisateur !" })
            );
        })
        .catch(() =>
          res
            .status(501)
            .json({ error: "Echec de la suppression de l'utilisateur !" })
        );
    })
    .catch(() =>
      res
        .status(501)
        .json({ error: "Echec de la suppression de l'utilisateur !" })
    );
};
