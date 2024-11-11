const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    isbn: { type: String, required: true, unique: true },
    genre: { type: String }, // Ex : "Science-fiction", "Histoire", "Roman"
    description: { type: String }, // Brève description du livre
    language: { type: String, default: 'English' }, // Langue du livre, avec une valeur par défaut
    pages: { type: Number }, // Nombre de pages
    publisher: { type: String }, // Éditeur du livre
});

module.exports = mongoose.model('Book', bookSchema);
