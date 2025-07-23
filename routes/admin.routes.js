const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser} = require('../controllers/admin.controller');

// Get all users (with optional role filter)
router.get('/', getAllUsers);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
