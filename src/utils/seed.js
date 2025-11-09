require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

async function seed() {
  await mongoose.connect(MONGO);
  const exists = await User.findOne({ username: 'admin' });
  if(!exists){
    const u = new User({ username: 'admin', password: process.env.ADMIN_PASS || 'password123' });
    await u.save();
    console.log('Admin created: admin');
  } else {
    console.log('Admin already exists');
  }
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
