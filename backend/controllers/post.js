const Post = require("../models/Post");
const fs = require("fs");

exports.post = (req, res) => {
  const body = JSON.parse(req.body.body);
  const d = new Date();
  const post = new Post(
    (userId = req.headers.userid),
    (title = body.title),
    (message = body.message),
    (imageUrl = ""),
    (createdAt = d),
    (updatedAt = d)
  );
  if (body.title == "") {
    post.title = null;
  }

  if (body.message == "") {
    post.message = null;
  }

  if (req.file) {
    let setImageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
      req.file.filename
    }`;
    post.imageUrl = setImageUrl;
  }

  Post.create(post)
    .then((data) => {
      res.status(201).json({ message: `Post ${data.insertId} créé !` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Un champ obligatoire est null !" });
    });
};

exports.updatePost = (req, res) => {
  const body = JSON.parse(req.body.body);
  const params = {
    title: `${body.title}`,
    message: `${body.message}`,
    imageUrl: `${body.imageUrl}`,
    updatedAt: new Date(),
  };

  if (req.file) {
    let setImageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
      req.file.filename
    }`;
    params.imageUrl = setImageUrl;
  }

  Post.update(params, body.id)
    .then(() => {
      if (req.file) {
        let croppedfile = body.imageUrl.split("3000/")[1];
        fs.unlink(`${croppedfile}`, () => {
          res.status(201).json({
            message: "Post mis à jour !",
          });
        });
      } else {
        res.status(201).json({ message: "Post mis à jour !" });
      }
    })
    .catch(() => {
      res.status(500).json({ err: "Echec de la mise à jour !" });
    });
};

exports.getPosts = (req, res) => {
  Post.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getPost = (req, res) => {
  Post.getPost(req.params.postId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getUserPosts = (req, res) => {
  Post.getFromUser(req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.deletePost = (req, res) => {
  let postId = 0;
  let filename = "";
  if (req.params.id.includes("&")) {
    postId = req.params.id.split("&")[0];
    filename = "images/posts/" + req.params.id.split("&")[1];
  } else {
    postId = req.params.id
  }

  Post.delete(postId)
    .then((data) => {
      if (req.params.id.includes("&")) {
        fs.unlink(`${filename}`, () => {
          res.status(200).json(data);
        });
      } else {
        res.status(200).json(data);
      }
      
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
