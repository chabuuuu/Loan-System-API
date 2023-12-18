import { takePGBackup } from "../backup";
const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'

export async function receiveNoti(){
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const chanel = await conn.createChannel()
        //3. create exchange
        const nameExchange = 'backup'
        await chanel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })
        //4. create queue
        const {queue} = await chanel.assertQueue('')
        console.log('name of queue:::', queue);
        //5. Binding
        await chanel.bindQueue(queue, nameExchange, '')
        await chanel.consume(queue, (msg : any) => {
            console.log(msg.content.toString());
            takePGBackup();
            // if (msg.content === 'backup/WorkerService'){
            //     takePGBackup();
            // }
        }, {
            noAck: true
        })
    } catch (error: any) {
        console.log(error.message);
    }
}
