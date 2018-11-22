const User = require('../models/user.model');
const userFunctions = require('./common/userFunctions');

exports.add_new_user = async function (req, res) {
    //check if user already exists
    let userExists = await userFunctions.user_exists_by_name(req);
    if (userExists) {
        res.send("Error, username already exists.");
        return
    }

    //if not, register new user
    create_and_display_new_user(req, res);
}

function create_and_display_new_user(req, res) {
    try {
        let user = new User({ username: req.body.username });
        user.save(function (err) {
            if (err) return handleError(err)
            res.json({ 'username': req.body.username, '_id': user._id });
            console.log("New user added to the database");
        })
    } catch (e) {
        console.log("error while registering new user");
        return
    }
}