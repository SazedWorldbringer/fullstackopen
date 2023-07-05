const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const helper = require('../tests/test_helper');

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

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(id, newBlog, { new: true })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog);
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
