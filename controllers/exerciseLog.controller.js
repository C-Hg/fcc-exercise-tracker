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

    let from = "";
    let to = "";
    let limit = "";

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

retrieve_and_display_log = function (req, res, user, from, to, limit) {
    let query = Exercise.find({ user_id: req.query.userId });
    query.select('description duration date');

    //optionnally adjusts according dates
    if (from) { query.where("date").gt(from); }
    if (to) { query.where("date").lt(to); }

    query.exec(function handleSearch(err, exercises) {
        if (err) return handleError(err);
        
        //keep total count but optionnally limits output
        let totalExercises = exercises.length;
        if (limit) { exercises = exercises.slice(0, limit); }     
        res.json({ User: user, 'Total number of sessions': totalExercises, Log: exercises });
    });
}