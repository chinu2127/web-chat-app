const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/MessageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(allMessages);

module.exports = router;
