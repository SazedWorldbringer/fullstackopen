const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'How to Learn Better in the Digital Age',
    author: 'Gian Segato',
    url: 'https://giansegato.com/essays/edutainment-is-not-learning',
    likes: '10',
  },
  {
    title: 'Life is short',
    author: 'Paul Graham',
    url: 'https://paulgraham.com/vb.html',
    likes: '10',
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will remove this soon' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
