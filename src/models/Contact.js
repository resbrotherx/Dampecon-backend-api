const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  budget: { type: String },
  files: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);
