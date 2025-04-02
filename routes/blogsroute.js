const express = require('express');
const blogsRouter = express.Router();

const upload = require('../middlewares/uploads');
const { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById } = require('../controllers/blogscontrollers');
const authenticateUser = require('../middlewares/authentication');

blogsRouter.post('/create', authenticateUser, upload.single('image'), createBlog);
blogsRouter.get('/', getBlogs);
blogsRouter.get('/:id', getBlogById);
blogsRouter.put('/:id', authenticateUser, upload.single('image'), updateBlog);
blogsRouter.delete('/:id', authenticateUser, deleteBlog);

module.exports = {blogsRouter};
