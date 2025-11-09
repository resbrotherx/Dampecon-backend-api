const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createContact } = require("../controllers/contact.controller");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/contacts"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/contact
router.post("/", upload.array("files", 5), createContact);

module.exports = router;
