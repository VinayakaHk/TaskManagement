const request = require('supertest');
const express = require('express');
const app = express();
const userFixture = require('../fixtures/user.fixture');
const { userOne, userTwo } = userFixture;
const { insertUsers } = require('../fixtures/user.fixture');
const setupTestDB = require('../setup');
const User = require('../../src/models/users.model');
const helpers = require('../../src/helpers');
const authRoutes = require('../../src/v1/routes/login.routes');

app.use(express.json());
app.use('/auth', authRoutes);

setupTestDB();
jest.mock('../../src/helpers', () => ({
    decodeAccessToken: jest.fn(),
    generateAccessToken: jest.fn(),
    verifyAccessToken: jest.fn()
}));

describe('Authentication Routes', () => {
    beforeEach(async () => {
        await insertUsers([userOne, userTwo]);
    });

    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'Password123',
            };

            helpers.generateAccessToken.mockReturnValue('token');

            const res = await request(app)
                .post('/auth/register')
                .send(newUser)
                .expect(200);

            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Authentication Successful');
            expect(res.body.token).toBe('token');

            const dbUser = await User.findOne({ email: newUser.email });
            expect(dbUser).not.toBeNull();
        });

        it('should fail if user already exists', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    firstName: userOne.firstName,
                    lastName: userOne.lastName,
                    email: userOne.email,
                    password: 'Password123',
                })
                .expect(500);

            expect(res.body.error).toBe(true);
            expect(res.body.message).toBe('User already exists');
        });
    });

    describe('POST /auth', () => {
        it('should authenticate an existing user with correct credentials', async () => {
            helpers.generateAccessToken.mockReturnValue('loginToken');

            const res = await request(app)
                .post('/auth')
                .send({
                    email: userOne.email,
                    password: userOne.password,
                })
                .expect(200);

            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Authentication Successful');
            expect(res.body.token).toBe('loginToken');
            expect(helpers.generateAccessToken).toHaveBeenCalled();
        });

        it('should return an error if password is incorrect', async () => {
            const res = await request(app)
                .post('/auth')
                .send({
                    email: userOne.email,
                    password: 'wrongPassword',
                })
                .expect(500);

            expect(res.body.error).toBe(true);
            expect(res.body.message).toBe('Invalid credentials');
        });
    });

    describe('POST /auth/google', () => {
        it('should authenticate using Google token', async () => {
            const decodedToken = {
                payload: {
                    email: userTwo.email,
                    name: userTwo.name,
                    picture: userTwo.picture,
                    sub: userTwo.googleId,
                },
            };

            helpers.decodeAccessToken.mockReturnValue(decodedToken);
            helpers.generateAccessToken.mockReturnValue('googleToken');

            const res = await request(app)
                .post('/auth/google')
                .send({ token: 'google_jwt_token' })
                .expect(200);

            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Authentication Successful');
            expect(res.body.token).toBe('googleToken');
        });

        it('should create a new user if Google user does not exist', async () => {
            const decodedToken = {
                payload: {
                    email: 'newuser@example.com',
                    name: 'New User',
                    picture: 'newpicture.jpg',
                    sub: 'newGoogleId',
                },
            };

            helpers.decodeAccessToken.mockReturnValue(decodedToken);
            helpers.generateAccessToken.mockReturnValue('googleToken');

            const res = await request(app)
                .post('/auth/google')
                .send({ token: 'google_jwt_token' })
                .expect(200);

            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Authentication Successful');
            expect(res.body.token).toBe('googleToken');

            const dbUser = await User.findOne({ email: decodedToken.payload.email });
            expect(dbUser).not.toBeNull();
            expect(dbUser.googleId).toBe(decodedToken.payload.sub);
        });
    });
});
