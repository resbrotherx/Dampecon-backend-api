const Project = require('../models/Project');

exports.getAll = async (req, res, next) => {
  try{
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  }catch(err){ next(err); }
};

exports.getOne = async (req, res, next) => {
  try{
    const item = await Project.findById(req.params.id);
    if(!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  }catch(err){ next(err); }
};

exports.create = async (req, res, next) => {
  try{
    const data = req.body;
    if(req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const p = new Project(data);
    await p.save();
    res.status(201).json(p);
  }catch(err){ next(err); }
};

exports.update = async (req, res, next) => {
  try{
    const data = req.body;
    if(req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  }catch(err){ next(err); }
};

exports.remove = async (req, res, next) => {
  try{
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  }catch(err){ next(err); }
};
