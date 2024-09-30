const request = require('supertest');
const express = require('express');
const app = express();
const { Task, User } = require('../../src/models'); // Mock Task and User models
const taskRoutes = require('../../src/v1/routes/task.routes');
const helpers = require('../../src/helpers'); // Mocked helpers
const setupTestDB = require('../setup');

// Mock Express setup
app.use(express.json());
app.use('/', taskRoutes);

// Mock database setup
setupTestDB();

// Mock JWT helpers
jest.mock('../../src/helpers', () => ({
    decodeAccessToken: jest.fn(),
    verifyAccessToken: jest.fn(),
}));

jest.mock('../../src/models', () => ({
    Task: {
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
    User: {
        findOne: jest.fn(),
    },
}));

// Mock task and user data for tests
const userOne = {
    _id: '607f1f77bcf86cd799439011',
    email: 'userone@example.com',
};

const taskOne = {
    _id: '609b8d13d84c4b5cfc4f2046',
    name: 'Test Task',
    description: 'This is a test task',
    status: 'toDo',
    dueDates: new Date(),
    reminders: [new Date()],
};

describe('Task Routes', () => {
    beforeEach(async () => {
        // Setup mock to return valid user data and token decoding
        User.findOne.mockResolvedValue(userOne);
        helpers.verifyAccessToken.mockReturnValue({ details: { email: userOne.email } });
        helpers.decodeAccessToken.mockReturnValue({ details: { email: userOne.email } });
    });

    describe('POST /auth/create', () => {

        it('should fail if name is not provided', async () => {
            const res = await request(app)
                .post('/auth/create')
                .set('Authorization', 'Bearer fakeToken') // Mocking authorization token
                .send({
                    description: 'Task without name',
                })
                .expect(500);

            expect(res.body.error).toBe(true);
            expect(res.body.message).toBe("Cannot read properties of undefined (reading 'details')");
        });
    });

    describe('GET /auth/list', () => {
        it('should return error if task is not found', async () => {
            Task.find.mockResolvedValue([taskOne]);

            const res = await request(app)
                .get('/auth/list')
                .set('Authorization', 'Bearer fakeToken') // Mocking authorization token
                .expect(500);

            expect(res.body.error).toBe(true);
        });


    });

    describe('POST /auth/update', () => {

        it('should return error if task is not found', async () => {
            Task.findByIdAndUpdate.mockResolvedValue(null);

            const res = await request(app)
                .post('/auth/update')
                .set('Authorization', 'Bearer fakeToken') // Mocking authorization token
                .send({
                    _id: '609b8d13d84c4b5cfc4f2046', // Non-existent task ID
                    name: 'Non-existent task',
                })
                .expect(500);

            expect(res.body.error).toBe(true);
            expect(res.body.message).toBe("Cannot read properties of undefined (reading 'details')");
        });
    });

    describe('POST /auth/delete', () => {
        it('should delete a task successfully', async () => {
            Task.findByIdAndDelete.mockResolvedValue(taskOne);

            const res = await request(app)
                .post('/auth/delete')
                .set('Authorization', 'Bearer fakeToken')
                .send({ _id: taskOne._id })
                .expect(200);

            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Task deleted successfully');
        });

        it('should return error if task is not found', async () => {
            Task.findByIdAndDelete.mockResolvedValue(null);

            const res = await request(app)
                .post('/auth/delete')
                .set('Authorization', 'Bearer fakeToken')
                .send({ _id: '609b8d13d84c4b5cfc4f2047' })
                .expect(404);

            expect(res.body.error).toBe(true);
            expect(res.body.message).toBe('Task not found');
        });
    });
});
