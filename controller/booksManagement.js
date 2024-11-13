// controllers/bookController.js
const Book = require('../model/booksManagement');

// Créer un livre
exports.createBook = async (req, res) => {
    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un livre par ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json({ message: 'Livre supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
