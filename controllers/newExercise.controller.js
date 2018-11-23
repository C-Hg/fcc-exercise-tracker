const Exercise = require('../models/exercise.model');
const userFunctions = require('./common/userFunctions');

exports.add_new_exercise = async function (req, res) {
    //ensure that user id is registered
    let user = await userFunctions.user_exists_by_id(req.body.userId);
    if (!user) {
        res.send("Error, incorrect id.");
        return
    }

    await create_and_display_new_exercise(req, res, user);
}

const create_and_display_new_exercise = async function (req, res, user) {
    try {
        let exercise = new Exercise({
            user_id: user._id,
            description: req.body.description,
            duration: req.body.duration
        });
        if (req.body.date) {
            if (isDateFormatValid(req.body.date)) {
                exercise.date = req.body.date;
            }
            else {
                res.send("Invalid date format : please use yyyy-mm-dd");
                return
            }
        }

        exercise.save(function (err) {
            if (err) return handleError(err)
            res.json({
                User: { username: user.username, _id: user._id },
                Exercise: { description: exercise.description, duration: exercise.duration, date: exercise.date }
            });
            console.log("New exercise added to the database");
        })
    } catch (e) {
        console.log("error while saving exercise to db");
        return
    }
}

function isDateFormatValid(date) {
    let regexp = /^(\d{4})-(\d{2})-(\d{2})$/;
    let result = date.match(regexp);
    if (result === null) { return false };
    if (result[1] > 1900 && result[1] < 2100 && result[2] > 0 && result[2] < 13 && result[3] > 0 && result[3] < 32) {
        return true;
    }
    return false;
}