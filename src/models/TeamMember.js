const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  photo: String,
  socials: {
    linkedin: String,
    twitter: String,
    github: String
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
