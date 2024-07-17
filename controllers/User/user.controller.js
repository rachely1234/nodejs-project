
const userService = require('../../services/user/user.services');



async function updateUserStatus(req, res) {
    const { userId } = req.params;
    const { exists } = req.body;

    if (typeof exists !== 'boolean') {
        return res.status(400).json({ message: 'exists must be a boolean' });
    }

    try {
        const updatedUser = await userService.updateUserStatus(userId, exists);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateUserStatuss,
};
