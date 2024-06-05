import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

describe('insert user', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/users');
    }, 20000);

    afterAll(async () => {
        await mongoose.connection.close();
    }, 20000);

    it('should insert a user into collection', async () => {
        const users = mongoose.connection.collection('users');
        const mockUser = { username: 'user1234', password: 'pass1' };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ username: 'user1234' });
        expect(insertedUser).toEqual(mockUser);
    });
});
