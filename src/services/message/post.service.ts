const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'
const fs = require('fs');
export async function postMsg(file: any) {
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const chanel = await conn.createChannel()
        //3. create exchange
        const nameExchange = 'backup-file'
        await chanel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })
        //4. publish video
        fs.readFile(file, async function(err: any, fileData: any) {
            if (err) {
                console.error(err);
                return;
            }
            // Gửi file data vào queue
            await chanel.publish(nameExchange, '', Buffer.from(fileData))
            console.log("File đã được gửi!");
        });
        console.log('Send OK');

        setTimeout(() => {
            conn.close();
            //process.exit(0);
        }, 2000);
    } catch (error: any) {
        console.log(error.message);
    }
}