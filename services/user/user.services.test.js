const { addUser } = require('./user.services'); // התאם את הנתיב לקובץ המקורי שלך
const { User, validUserSchema } = require('../../models/user.Schema');

// Mocking User.findOne and User.save methods
jest.mock('../../models/user.Schema', () => ({
    User: {
        findOne: jest.fn(),
        save: jest.fn()
    }
}));

describe('addUser function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // לפני כל טסט, נקה את כל הקריאות המוקדמות ל-mocks
});

    it('should add a new user successfully', async () => {
        const mockUserInput = {
            userId: 'test123',
            name: 'Test User',
            email: 'testuser@example.com',
            phone: '1234567890'
        };

        // Mock findOne to return null (indicating no existing user with the same email)
        User.findOne.mockResolvedValue(null);

        // Mock save to return the saved user object
        User.save.mockResolvedValue(mockUserInput);

        const result = await addUser(mockUserInput);

        expect(result).toEqual(mockUserInput);
        expect(User.findOne).toHaveBeenCalledWith({ email: mockUserInput.email });
        expect(User.save).toHaveBeenCalledWith(expect.objectContaining(mockUserInput));
    });

    it('should throw an error if email already exists', async () => {
        const mockUserInput = {
            userId: 'test123',
            name: 'Test User',
            email: 'existinguser@example.com',
            phone: '1234567890'
        };

        // Mock findOne to return an existing user with the same email
        User.findOne.mockResolvedValue({ email: 'existinguser@example.com' });

        await expect(addUser(mockUserInput)).rejects.toThrow('email is exist already');
    });

    it('should throw an error if userId already exists', async () => {
        const mockUserInput = {
            userId: 'test123',
            name: 'Test User',
            email: 'newussser@example.com',
            phone: '1234567890'
        };

        // Mock findOne to return an existing user with the same userId
        User.findOne.mockResolvedValue({ userId: 'existing123' });

        await expect(addUser(mockUserInput)).rejects.toThrow('user is exist already');
    });

    it('should throw an error if user data is invalid', async () => {
        const mockUserInput = {
            userId: 'test123',
            name: 'Test User',
            email: 'invalidemail', // Invalid email format
            phone: '1234567890'
        };

        // Mock findOne to return null (no existing user)
        User.findOne.mockResolvedValue(null);

        await expect(addUser(mockUserInput)).rejects.toThrow('email must be a valid email');
    });
});
