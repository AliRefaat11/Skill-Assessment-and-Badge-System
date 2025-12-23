const assessmentAttempt = require('../Models/assessmentAttemptModel');
const Question = require('../Models/questionsModel');
const Assessment = require('../Models/assesmentModel');
const Learner = require('../Models/learnerModel');

exports.getAttemptById = async (req, res) => {
    try {
        const attempt = await assessmentAttempt.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }
        res.status(200).json({
            success: true,
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllAttempts = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find();
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptsByAssessment = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find({ assessmentID: req.params.assessmentId });
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptsByLearner = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find({ learnerID: req.params.learnerId }); 
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createAttempt = async (req, res) => {
    try {
        const newAttempt = new assessmentAttempt(req.body);
        const savedAttempt = await newAttempt.save();
        res.status(201).json({
            success: true,
            data: savedAttempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.countAttempts = async (req, res) => {
    try {
        const count = await assessmentAttempt.countDocuments();
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.countLearnerAttempts = async (req, res) => {
    try {
        const count = await assessmentAttempt.countDocuments({ learnerID: req.params.learnerId });
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptByLearnerAndAssessment = async (req, res) => {
    try {
        const attempt = await assessmentAttempt.findOne({
            learnerID: req.params.learnerId,
            assessmentID: req.params.assessmentId
        });
        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }
        res.status(200).json({
            success: true,
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Start an assessment attempt
exports.startAttempt = async (req, res) => {
    try {
        const assessmentId = req.query.assessment || req.query.assessmentId;
        const userId = req.user._id;

        if (!assessmentId) {
            return res.status(400).json({
                success: false,
                message: "Assessment ID is required"
            });
        }

        // Get learner ID from user
        const learner = await Learner.findOne({ UserID: userId });
        if (!learner) {
            return res.status(404).json({
                success: false,
                message: "Learner profile not found"
            });
        }

        // Check if assessment exists
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: "Assessment not found"
            });
        }

        // Check if there's already an in-progress attempt
        let attempt = await assessmentAttempt.findOne({
            learnerID: learner._id,
            assessmentID: assessmentId,
            status: { $in: ["pending", "in-progress"] }
        });

        if (attempt) {
            // Return existing attempt
            return res.status(200).json({
                success: true,
                data: attempt
            });
        }

        // Create new attempt
        attempt = await assessmentAttempt.create({
            learnerID: learner._id,
            assessmentID: assessmentId,
            status: "in-progress",
            startedAt: new Date(),
            score: 0,
            answers: []
        });

        res.status(201).json({
            success: true,
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Submit assessment answers
exports.submitAttempt = async (req, res) => {
    try {
        const { attemptId, answers } = req.body;
        const userId = req.user._id;

        if (!attemptId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: "Attempt ID and answers array are required"
            });
        }

        // Get learner
        const learner = await Learner.findOne({ UserID: userId });
        if (!learner) {
            return res.status(404).json({
                success: false,
                message: "Learner profile not found"
            });
        }

        // Get attempt
        const attempt = await assessmentAttempt.findById(attemptId)
            .populate('assessmentID');
        
        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }

        // Verify attempt belongs to learner
        if (attempt.learnerID.toString() !== learner._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this attempt"
            });
        }

        // Check if already submitted
        if (attempt.status === "submitted" || attempt.status === "passed" || attempt.status === "failed") {
            return res.status(400).json({
                success: false,
                message: "Assessment already submitted"
            });
        }

        // Get all questions for this assessment
        const questions = await Question.find({ assessmentId: attempt.assessmentID._id });
        
        // Calculate score
        let totalScore = 0;
        const questionMap = new Map();
        questions.forEach(q => {
            questionMap.set(q._id.toString(), q);
        });

        // Validate and score answers
        const validatedAnswers = answers.map(answerItem => {
            const question = questionMap.get(answerItem.questionId);
            if (!question) {
                return null;
            }

            const isCorrect = question.correctAnswer.trim().toLowerCase() === answerItem.answer.trim().toLowerCase();
            if (isCorrect) {
                totalScore += question.points;
            }

            return {
                questionId: question._id,
                answer: answerItem.answer
            };
        }).filter(a => a !== null);

        // Update attempt
        attempt.answers = validatedAnswers;
        attempt.score = totalScore;
        attempt.status = "submitted";
        attempt.submittedAt = new Date();

        // Determine pass/fail (assuming 60% is passing)
        const assessment = attempt.assessmentID;
        const passingScore = (assessment.TotalMarks * 0.6);
        if (totalScore >= passingScore) {
            attempt.status = "passed";
        } else {
            attempt.status = "failed";
        }

        await attempt.save();

        res.status(200).json({
            success: true,
            data: attempt,
            message: "Assessment submitted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Render attempt page
exports.renderAttemptPage = async (req, res) => {
    try {
        const { assessment } = req.query;
        if (!assessment) {
            return res.status(400).render('pages/404', {
                user: res.locals.user,
                message: 'Assessment ID is required'
            });
        }

        // Check if user is authenticated
        // res.locals.user should be set by middleware in server.js
        if (!res.locals.user) {
            // Redirect to login with return URL
            const redirectUrl = encodeURIComponent(`/attempts/start?assessment=${assessment}`);
            return res.redirect(`/api/v1/auth?redirect=${redirectUrl}`);
        }

        // Verify user is a Learner
        if (res.locals.user.Role !== 'Learner') {
            return res.status(403).render('pages/404', {
                user: res.locals.user,
                message: 'Only learners can take assessments'
            });
        }

        res.render('pages/attempt', {
            user: res.locals.user,
            assessmentId: assessment,
            pageCss: '/assets/css/attempt.css'
        });
    } catch (error) {
        console.error('Error rendering attempt page:', error);
        res.status(500).render('pages/404', {
            user: res.locals.user,
            message: error.message || 'An error occurred while loading the assessment'
        });
    }
};