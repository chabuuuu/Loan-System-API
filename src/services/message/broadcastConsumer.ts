const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'

export async function broadcastConsumer(severity: any, nameExchange: any) {
    try {
      let send_type = 'fanout'
      if (nameExchange === 'direct-exchange'){
          send_type = 'direct'
      }
      //1. create connect
      const conn = await amqplib.connect(amqp_url_docker);
      //2. create chanel
      const chanel = await conn.createChannel()
      //3. create exchange
      await chanel.assertExchange(nameExchange, send_type, {
          durable: false
      })
      //4. create queue
      // const {queue} = await chanel.assertQueue('', {
      //     exclusive: true
      // })
      const nameQueue = 'queueB'
      await chanel.assertQueue(nameQueue, {
          durable: false,
          exclusive: false
      })
      //5. Binding
      await chanel.bindQueue(nameQueue, nameExchange, severity)
      await chanel.consume(nameQueue, (msg : any) => {
          console.log(msg.content.toString());
      }, {
          noAck: true
      })
  } catch (error: any) {
      console.log(error.message);
  }
  }