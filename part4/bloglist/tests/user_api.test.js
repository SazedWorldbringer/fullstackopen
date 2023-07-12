const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
}, 100000);

describe('when there are some users saved in the database', () => {
  test('users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(helper.initialUsers.length);
  })
})

describe('adding new users', () => {
  test('user is added', async () => {
    const password = 'downwiththelordruler';

    const newUser = {
      username: 'survivor',
      name: 'Kelsier',
      password: 'downwiththelordruler',
    };

    // save newUser to the database
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // test if the length of users in db is one more than that of initial users
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toEqual(helper.initialUsers.length + 1);

    // test if the correct content is saved
    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(
      'survivor'
    );
  })

  test('fails with status code of 400 if invalid data is passed', async () => {
    const userWithoutUsernameAndPassword = {
      name: 'Perrin Aybara',
    };

    // send user to the database, see if the api returns status 400
    await api
      .post('/api/users')
      .send(userWithoutUsernameAndPassword)
      .expect(400)
  })

  test('fails with status code of 401 if username or password are less than 3 chars long', async () => {
    const userWithInvalidUsernameAndPassword = {
      name: 'Matrim Cauthon',
      username: 'rh',
      password: 'mc'
    }

    // send user to the databse, see if the api returns status code of 401
    await api
      .post('/api/users')
      .send(userWithInvalidUsernameAndPassword)
      .expect(401)
  })
})
