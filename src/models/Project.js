const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  coverImage: String, // path or URL
  link: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
