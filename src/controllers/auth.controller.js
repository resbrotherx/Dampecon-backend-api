const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const u = new User({ username, password });
    await u.save();
    res.status(201).json({ message: 'Admin created' });
  } catch(err){ next(err); }
}

exports.login = async (req, res, next) => {
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  }catch(err){ next(err); }
};
