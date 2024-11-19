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

        return {
            status: isAvailable ? 'success' : 'error',
            message: isAvailable ? 'Book is available.' : 'Book is not available.',
        };
    } catch (error) {
        console.error('Error in handleCheckBookAvailability:', error.message);
        return {
            status: 'error',
            message: 'Error while checking book availability.',
        };
    }
};

// Mettre à jour le statut du livre après un retour
// Gestion de l'événement `borrow.book-returned`
exports.handleBookReturned = async (payload) => {
    try {
        const { bookId } = payload;

        // Mettre à jour le statut du livre à "available"
        const updatedBook = await Book.findByIdAndUpdate(bookId, { status: 'available' }, { new: true });

        if (!updatedBook) {
            console.error(`Book ${bookId} not found.`);
            return;
        }

        console.log(`Book ${bookId} status updated to "available".`);
    } catch (error) {
        console.error('Error in handleBookReturned:', error.message);
    }
};
