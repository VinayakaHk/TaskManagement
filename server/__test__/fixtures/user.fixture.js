const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../src/models/users.model');

const password = '7fcd3033050be8c9e5e5a40a6f82823c61c2310c92d5825de8345887aa06deaf';


email = faker.internet.email();
const userOne = {
    _id: new mongoose.Types.ObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: email.toLowerCase(),
    password,
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    isEmailVerified: false,
    googleId: null,

};

email = faker.internet.email();
const userTwo = {
    _id: new mongoose.Types.ObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    picture: faker.image.avatar(),
    email: email.toLowerCase(),
    googleId: '114687055092223651277',
    isEmailVerified: true,
};


const insertUsers = async (users) => {
    await User.insertMany(users);
};

module.exports = {
    userOne,
    userTwo,

    insertUsers,
};