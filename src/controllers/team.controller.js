const TeamMember = require('../models/TeamMember');

exports.getAll = async (req, res, next) => {
  try {
    const items = await TeamMember.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await TeamMember.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = req.body;

    // If photo uploaded
    if (req.file) data.photo = `/uploads/${req.file.filename}`;

    // socials might come as JSON string from FormData
    if (typeof data.socials === 'string') {
      try { data.socials = JSON.parse(data.socials); } catch (_) {}
    }

    const member = new TeamMember(data);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = req.body;

    if (req.file) data.photo = `/uploads/${req.file.filename}`;

    if (typeof data.socials === 'string') {
      try { data.socials = JSON.parse(data.socials); } catch (_) {}
    }

    const updated = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};