require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const projectsRoutes = require('./routes/projects.routes');
//const servicesRoutes = require('./routes/services.routes');
//const teamRoutes = require('./routes/team.routes');
//const contactRoutes = require('./routes/contact.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
//app.use('/api/services', servicesRoutes);
//app.use('/api/team', teamRoutes);
//app.use('/api/contact', contactRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://mongo:27017/portfolio';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
