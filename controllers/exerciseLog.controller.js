const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const userFunctions = require('./common/userFunctions');
const dateFunctions = require('./common/dateFunctions');

exports.retrieve_exercise_log = async function (req, res) {
    //ensure that user id is registered
    let user = await userFunctions.user_exists_by_id(req.query.userId);
    if (!user) {
        res.send("Error, incorrect id.");
        return
    }

    let from, to, limit;
    if (req.query.from) {
        if (dateFunctions.isDateFormatValid(req.query.from)) {
            from = new Date(req.query.from);
        }
        else {
            res.send("Invalid date format in \"from\" field : please use yyyy-mm-dd");
            return
        }
    }
    if (req.query.to) {
        if (dateFunctions.isDateFormatValid(req.query.to)) {
            to = new Date(req.query.to);
        }
        else {
            res.send("Invalid date format in \"to\" field : please use yyyy-mm-dd");
            return
        }
    }
    if (req.query.limit) {
        limit = req.query.limit;
    }

    retrieve_and_display_log(req, res, user, from, to, limit);
}

retrieve_and_display_log = async function (req, res, user, from, to, limit) {
    try {
        let exercises = await Exercise.find({ user_id: req.query.userId }, 'description duration date', function handleSearch(err) {
            if (err) return handleError(err);
        })
        //adjust results according to optional parameters
        let selectedExercises = exercises;
        if (from) {
            selectedExercises = selectedExercises.filter((val) => val.date > from);
        }
        if (to) {
            selectedExercises = selectedExercises.filter((val) => val.date < to);
        }
        if (limit) {
            selectedExercises = selectedExercises.slice(0, limit);
        }

        res.json({ User: user, 'Total number of sessions': exercises.length, Log: selectedExercises });
        return
    } catch (e) {
        console.log('error while fetching exercises');
        return
    }
}