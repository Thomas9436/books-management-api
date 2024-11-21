const connectRabbitMQ = require('../../clients/rabbitmq');

async function publishBookManageResponse(channel, response) {
    await connectRabbitMQ();

    const exchange = 'book-manage.responses';

    await channel.assertExchange(exchange, 'topic', { durable: true });
    const routingKey = `book.response.${response.status}`;

    const message = {
        event: 'book.response',
        correlationId: response.correlationId, // Ajout du correlationId
        status: response.status,
        message: response.message
    };

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    console.log('Published book-manage response:', message);
}

module.exports = { publishBookManageResponse };
