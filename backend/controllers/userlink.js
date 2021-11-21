const Userlink = require("../models/Userlink");

exports.follow = (req, res) => {
  const d = new Date()
  const userlink = new Userlink(
    (userId = req.headers.userid),
    (partnerId = req.body.partnerId),
    (createdAt = d)
  );
  Userlink.create(userlink)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err.code);
    });
};

exports.unfollow = (req, res) => {
  Userlink.delete(req.params.linkId)
    .then((data) => {
      res.status(200).json({ message: "Userlink supprimé !" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getlink = (req, res) => {
  Userlink.getOne(req.headers.userid, req.params.partnerId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getlinks = (req, res) => {
  Userlink.getlinks(req.params.userId)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(404).json(err);
  })
}

