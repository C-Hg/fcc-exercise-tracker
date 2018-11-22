const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const userFunctions = require('./common/userFunctions');

exports.add_new_exercise = async function(req, res) {
    //ensure that user id is registered
    let user = await userFunctions.user_exists_by_id(req);
    if (!user) {
        res.send("Error, incorrect id.");
        return
    }
    create_and_display_new_exercise(req, res, user);
}

const create_and_display_new_exercise = async function (req, res, user) {
    try {
        let exercise = new Exercise({
            user_id: user._id,
            description: req.body.description,
            duration: req.body.duration
        })
        exercise.save(function (err) {
            if (err) return handleError(err)
            res.json({ 
                User: {username: user.username, _id: user._id}, 
                Exercise:{description: exercise.description, duration: exercise.duration, date: exercise.date} 
            });
            console.log("New exercise added to the database");
        })
    } catch(e) {
        console.log("error while registering new exercise");
        return
    }
}