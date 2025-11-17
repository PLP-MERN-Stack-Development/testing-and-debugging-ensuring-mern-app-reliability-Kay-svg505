const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const postsRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRoutes);

app.use(errorHandler);

module.exports = app;
