// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controller/booksManagement');

const router = express.Router();

// Créer un livre
router.post('/', bookController.createBook);

// Lire tous les livres
router.get('/', bookController.getAllBooks);

// Lire un livre par ID
router.get('/:id', bookController.getBookById);

// Mettre à jour un livre
router.put('/:id', bookController.updateBook);

// Supprimer un livre
router.delete('/:id', bookController.deleteBook);

module.exports = router;
