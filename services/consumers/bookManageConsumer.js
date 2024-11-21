const connectRabbitMQ = require('../../clients/rabbitmq');
const { handleCheckBookAvailability } = require('../booksManagementService');
const { publishBookManageResponse } = require('../producers/bookManageProducer');

async function consumeBookManageEvents() {
    const channel = await connectRabbitMQ();

    const queue = 'book-manage-events.queue';
    const exchange = 'book-manage.events';

    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, 'book.*'); // Liaison pour toutes les réponses

    console.log(`Waiting for book-manage responses in queue: ${queue}...`);

    channel.consume(queue, async (msg) => {
        if (msg) {
            const event = JSON.parse(msg.content.toString());
            console.log(`Received event: ${event.event}`, event.payload);

            if (!event.payload) {
                console.error('Payload absent pour cet événement:', event);
                channel.ack(msg);
                return;
            }

            const { correlationId, payload } = event;

            let response;
            switch (event.event) {
                case 'book.check-book-availability':
                    response = await handleCheckBookAvailability(payload, correlationId);
                    break;
                default:
                    console.warn(`Unhandled event: ${event.event}`);
                    response = null;
            }

            // Publiez une réponse si nécessaire
            //Produit un évenement BookManageResponse
            if (response) {
                await publishBookManageResponse(channel, response);
            }

            channel.ack(msg); // Acquitte le message
        }
    });
}

module.exports = { consumeBookManageEvents };
