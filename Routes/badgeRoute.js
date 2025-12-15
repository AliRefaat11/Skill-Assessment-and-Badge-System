const express = require("express");
const router = express.Router();
const badgeController = require('../Controllers/badgeController');

router.post('/', badgeController.createBadge);
router.get('/', badgeController.getBadges);
router.get('/:id', badgeController.getBadgeById);
router.put('/:id', badgeController.updateBadge);
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;