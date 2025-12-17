// src/models/adminModels.js

// Base shapes (documentation only, to guide how objects should look)

/**
 * @typedef {Object} Course
 * @property {number|string} id
 * @property {string} title
 * @property {string} category
 * @property {number} quizzes
 * @property {number} students
 * @property {"Beginner"|"Intermediate"|"Advanced"} difficulty
 */

/**
 * @typedef {Object} User
 * @property {number|string} id
 * @property {string} name
 * @property {string} email
 * @property {number} xp
 * @property {number} level
 * @property {number} quizzes
 */

/**
 * @typedef {Object} Question
 * @property {number|string} id
 * @property {string} course
 * @property {string} question
 * @property {number} answers
 * @property {"Beginner"|"Intermediate"|"Advanced"} difficulty
 */

export const initialStats = {
  totalUsers: 1543,
  totalCourses: 24,
  totalQuizzes: 156,
  activeUsers: 892
};

/** @type {Course[]} */
export const initialCourses = [
  { id: 1, title: "JavaScript Fundamentals", category: "Programming", quizzes: 12, students: 450, difficulty: "Beginner" },
  { id: 2, title: "React Advanced Patterns", category: "Programming", quizzes: 8, students: 230, difficulty: "Advanced" },
  { id: 3, title: "Data Structures & Algorithms", category: "Computer Science", quizzes: 15, students: 380, difficulty: "Intermediate" },
  { id: 4, title: "UI/UX Design Principles", category: "Design", quizzes: 6, students: 290, difficulty: "Beginner" }
];

/** @type {User[]} */
export const initialUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", xp: 12450, level: 8, quizzes: 45 },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", xp: 11280, level: 7, quizzes: 38 },
  { id: 3, name: "Mike Rodriguez", email: "mike@example.com", xp: 10950, level: 6, quizzes: 42 },
  { id: 4, name: "Emma Davis", email: "emma@example.com", xp: 9870, level: 6, quizzes: 35 }
];

/** @type {Question[]} */
export const initialQuestions = [
  { id: 1, course: "JavaScript Fundamentals", question: "What is closure in JavaScript?", answers: 4, difficulty: "Intermediate" },
  { id: 2, course: "React Advanced Patterns", question: "Explain the useEffect hook", answers: 4, difficulty: "Advanced" },
  { id: 3, course: "CSS Flexbox", question: "How to center a div using flexbox?", answers: 4, difficulty: "Beginner" }
];
