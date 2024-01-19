import { takePGBackup } from "../backup";
const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'

export async function receiveScheduleNoti(){
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const backup_chanel = await conn.createChannel()
        //3. create exchange
        let nameExchange = 'schedule'
        await backup_chanel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })
        //4. create queue
        const {queue} = await backup_chanel.assertQueue('')
        console.log('name of schedule queue:::', queue);
        //5. Binding
        await backup_chanel.bindQueue(queue, nameExchange, '')
        await backup_chanel.consume(queue, (msg : any) => {
            console.log("Schedule receive::: ", msg.content.toString());
        }, {
            noAck: true
        })
    } catch (error: any) {
        console.log(error.message);
    }
}
