const express = require("express");

const postController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const multer = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, multer, postController.createPost);

router.put("/:id", checkAuth, multer, postController.updatePost);

router.get("", postController.getPosts);

router.get("/:id", postController.getPostById);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
