const express = require('express');
const booksManagementRoutes = require('../routes/booksManagement');

const router = express.Router();

router.use('/books-manage', booksManagementRoutes);

module.exports = router;
