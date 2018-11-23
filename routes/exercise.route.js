const express = require('express');
const router = express.Router();

const newUser = require('../controllers/newUser.controller');
const allUsers = require('../controllers/allUsers.controller')
const newExercise = require('../controllers/newExercise.controller');
const exerciseLog = require('../controllers/exerciseLog.controller');


router.post('/add', newExercise.add_new_exercise);
router.post('/new-user', newUser.add_new_user);

router.get('/users', allUsers.retrieve_all_users);
router.get('/log', exerciseLog.retrieve_exercise_log);

module.exports = router;