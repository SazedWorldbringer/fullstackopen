const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./test_helper');

describe('bloglist', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)
  }, 100000)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    const blogs = response.body
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('blogs are saved to the bloglist', async () => {
    const newBlog = {
      title: 'Digging my way out of tutorial hell',
      author: 'Zuzana K',
      url: 'https://www.zuzana-k.com/blog/digging-my-way-out-of-tutorial-hell/',
      likes: 1000,
    };

    // test the backend responds correctly
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // test if the length of blogs in db is one more than that of initial blogposts
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    // test if contents of the new blog are saved correctly
    const contents = blogsAtEnd.map((blog) => blog.title);
    expect(contents).toContain(
      'Digging my way out of tutorial hell'
    );
  })

  test('blogs have an initial likes property of 0', async () => {
    const blogWithoutLikes = {
      title: 'Attention is your scarcest resource',
      author: 'Ben',
      url: 'https://www.benkuhn.net/attention/'
    };

    const response = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)

    const returnedBlog = response.body;
    expect(returnedBlog.likes).toBe(0);
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
