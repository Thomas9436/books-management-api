const bookManagementService = require('../services/booksManagementService');

// Créer un livre
exports.createBook = async (req, res) => {
    try {
        const savedBook = await bookManagementService.createBook(req.body);
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookManagementService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un livre par ID
exports.getBookById = async (req, res) => {
    try {
        const book = await bookManagementService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await bookManagementService.updateBook(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await bookManagementService.deleteBook(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json({ message: 'Livre supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
