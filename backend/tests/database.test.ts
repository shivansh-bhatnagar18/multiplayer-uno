import mongoose from 'mongoose';

describe('DB connection test', () => {
    beforeAll(async () => {
        await mongoose
            .connect('mongodb://localhost:27017/users')
            .then(() => console.log('DB connected'));
    }, 30000);
    it('should insert a user into collection', async () => {
        const users = mongoose.connection.collection('users');
        const mockUser = { name: 'user1234', password: 'pass1' };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ name: 'user1234' });
        expect(insertedUser).toEqual(mockUser);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});
