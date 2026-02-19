const Comment = require('../models/comment');

exports.getAll = async (req, res, next) => {
  try {
    const items = await Comment.find()
      .populate('project', 'title')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await Comment.findById(req.params.id)
      .populate('project', 'title');

    if (!item) return res.status(404).json({ message: 'Not found' });

    res.json(item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profileImage = `/uploads/${req.file.filename}`;
    }

    const comment = new Comment(data);
    await comment.save();

    res.status(201).json(comment);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) { next(err); }
};