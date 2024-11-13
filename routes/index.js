const express = require('express');
const booksManagementRoutes = require('../routes/booksManagement');

const router = express.Router();

router.use(booksManagementRoutes);

module.exports = router;
