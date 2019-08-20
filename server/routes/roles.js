const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");
const roleController = require("../controllers/roleController");

router.get("/", checkJwt, roleController.findAllRoles);

module.exports = router;
