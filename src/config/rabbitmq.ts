import amqp from "amqplib";

export const RabbitMQ = {
  connection: null as any,
  channel: null as any,

  async connect(): Promise<void> {
    try {
      const url = process.env.RABBITMQ_URL || "amqp://localhost";

      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();

    } catch (error) {
      console.error("❌ Error connecting to RabbitMQ:", error);
      setTimeout(() => this.connect(), 5000);
    }
  },

  async publish(exchange: string, routingKey: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.assertExchange(exchange, "topic", { durable: true });

    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
  },
};
