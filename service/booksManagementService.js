// book-service/services/bookAvailabilityService.js
const mqttClient = require('../config/mqttClient');
const Book = require('../model/booksManagement');

mqttClient.on('connect', () => {
    mqttClient.subscribe('book/borrowed');
    mqttClient.subscribe('book/returned');
});

mqttClient.on('message', async (topic, message) => {
    const { bookId, status } = JSON.parse(message);

    try {
        if (topic === 'book/borrowed' || topic === 'book/returned') {
            await Book.findByIdAndUpdate(bookId, { status });
        }
    } catch (error) {
        console.error('Erreur de mise à jour du statut du livre:', error);
    }
});
