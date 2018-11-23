const User = require('../models/user.model');

exports.retrieve_all_users = async function (req, res) {
    try {
        let users = await User.find({},'username _id', function handleSearch(err) {
            if (err) return handleError(err);
        })
        res.json(users);
    } catch (e) {
        console.log('error while fetching users');
        return
    }
}