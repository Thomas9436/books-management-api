const Book = require('../model/booksManagement');

// Créer un livre
exports.createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

// Lire tous les livres
exports.getAllBooks = async () => {
    return await Book.find();
};

// Lire un livre par ID
exports.getBookById = async (id) => {
    return await Book.findById(id);
};

// Mettre à jour un livre
exports.updateBook = async (id, updates) => {
    return await Book.findByIdAndUpdate(id, updates, { new: true });
};

// Supprimer un livre
exports.deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

// Vérifier la disponibilité d'un livre
exports.handleCheckBookAvailability = async (payload) => {
    try {
        const book = await Book.findById(payload.bookId);
        const isAvailable = book && book.status === 'available';

        const { correlationId } = payload;

        return {
            correlationId,
            status: isAvailable ? 'success' : 'error',
            message: isAvailable ? 'Book is available.' : 'Book is not available.'
        };
    } catch (error) {
        console.error('Error in handleCheckBookAvailability:', error.message);
        return {
            status: 'error',
            message: 'Error while checking book availability.'
        };
    }
};
