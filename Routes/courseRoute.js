const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesBySkill
} = require('../Controllers/courseController');

const router = express.Router();

router.route('/')
  .get(getAllCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

// Optional: courses by skill
router.get('/skill/:skillID', getCoursesBySkill);

module.exports = router;
