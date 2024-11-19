const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date},
    isbn: { type: String, unique: true },
    genre: { type: String }, // Ex : "Science-fiction", "Histoire", "Roman"
    description: { type: String }, // Brève description du livre
    language: { type: String, default: 'English' }, // Langue du livre, avec une valeur par défaut
    pages: { type: Number }, // Nombre de pages
    publisher: { type: String }, // Éditeur du livre
    status: {
        type: String,
        enum: ['available', 'borrowed', 'returned', 'overdue'],
        default: 'available'
    } 
});

module.exports = mongoose.model('Book', bookSchema);
