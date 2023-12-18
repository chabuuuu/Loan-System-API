// importing required modules
const { execute } = require('@getvim/execute');
const dotenv = require('dotenv').config();
const compress = require('gzipme');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELE_BOT_TOKEN;
const chat_id = process.env.TELE_CHAT_ID;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});
// writing postgresql backup function
export async function takePGBackup() {
    // getting db connection parameters from environment file
const username = process.env.DB_USERNAME;
const database = "WorkerService";
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbPass = process.env.DB_PASSWORD;
const backupDir = process.env.BACKUP_DB
// defining backup file name
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
const backupFile= `loan_system-${today}.tar`;

    await exec(`PGPASSWORD=${dbPass} pg_dump -U ${username} -F t LOAN_SYSTEM > ${backupDir}/${backupFile}`)
    console.log('Done create backup');
    bot.sendMessage(chat_id, "Your database backup file: ");
    bot.sendDocument(chat_id, `${backupDir}/${backupFile}` )
}

// calling postgresql backup function