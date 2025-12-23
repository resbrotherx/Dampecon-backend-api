const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: [String],
  coverImage: String, // path or URL
  link: String,
  state: String,
  clientName: String,
  timeLine: String,
  result: [String],
  isVideo: { type: Boolean, default: false },
  
  // active: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
