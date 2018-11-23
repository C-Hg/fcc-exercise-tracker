const User = require('../../models/user.model');

exports.user_exists_by_name = async function (req) {
    try {
        let userExists = await User.findOne({ username: req.body.username },'_id username', function handleSearch(err){
            if (err) return handleError(err);
        });
        return userExists;
    } catch (e) {
        console.log("error while checking db");
        return
    }
}

exports.user_exists_by_id = async function (id) {
    try {
        let userExists = await User.findOne({ _id: id }, function handleSearch(err){
            if (err) return handleError(err);
        });
        return userExists;
    } catch (e) {
        console.log("error while checking db");
        return
    }
}