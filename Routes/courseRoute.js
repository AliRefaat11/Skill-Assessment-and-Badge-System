const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesBySkill
} = require('../controllers/courseController');

const router = express.Router();

router.route('/')
  .get(getAllCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

router.get('/skill/:skillID', getCoursesBySkill);

module.exports = router;
