const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const helper = require('./test_helper');

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('survivorismiscool', 10);
    const user = new User({ username: 'Kelsier', passwordHash });

    await user.save();
  }, 10000);

  test('users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })

  test('creation of a new user succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'cephandrius',
      name: 'Hoid',
      password: 'TheOneWhoDenied',
    };

    // save user to the db
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // test if the length of users in the db is one more than that of initial users
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    // test if new username is correctly saved in the db
    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const userWithDuplicateUsername = {
      username: 'Kelsier',
      password: 'actuallynoimcool',
    }

    // save user to the db
    const response = await api
    .post('/api/users')
    .send(userWithDuplicateUsername)
    .expect(400)
      .expect('Content-Type', /application\/json/);

    // test if correct error is returned
    expect(response.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  })

  test('fails with status code of 400 if incomplete data is passed', async () => {
    const userWithoutUsernameAndPassword = {
      name: 'Perrin Aybara',
    };

    // send user to the database, see if the api returns status 400
    await api
      .post('/api/users')
      .send(userWithoutUsernameAndPassword)
      .expect(400)
  })
})

/*

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
}) */
