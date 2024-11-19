const connectRabbitMQ = require('../../clients/rabbitmq');

async function publishBookManageResponse(channel, response) {
    const channel = await connectRabbitMQ();

    const exchange = 'book-manage.responses';
    await channel.assertExchange(exchange, 'topic', { durable: true });

    const routingKey = `book-manage.response.${response.status}`; // Clé de routage basée sur le statut
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(response)));
    console.log(`Published book response:`, response);
}


module.exports = { publishBookManageResponse };