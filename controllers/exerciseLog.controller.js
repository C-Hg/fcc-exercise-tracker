const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const userFunctions = require('./common/userFunctions');

exports.retrieve_exercise_log = async function (req, res) {
    //ensure that user id is registered
    let user = await userFunctions.user_exists_by_id(req.query.userId);
    if (!user) {
        res.send("Error, incorrect id.");
        return
    }

    retrieve_and_display_log(req, res, user);
}

retrieve_and_display_log = async function (req, res, user) {
    try {
        let exercises = await Exercise.find({ user_id: req.query.userId }, function handleSearch(err) {
            if (err) return handleError(err);
        })
        res.json({User: user, 'Number of sessions': exercises.length, Log: exercises});
        return
    } catch (e) {
        console.log('error while fetching exercises');
        return
    }
}