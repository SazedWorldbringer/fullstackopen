const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).json('Bad Request');
    return;
  }

  const blog = new Blog({
    // instantiate likes at 0 if not provided
    likes: body.likes || 0,
    ...body,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
})

module.exports = blogsRouter
