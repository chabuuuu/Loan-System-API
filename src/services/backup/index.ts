// importing required modules
const { execute } = require('@getvim/execute');
const dotenv = require('dotenv').config();
const compress = require('gzipme');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// writing postgresql backup function
export async function takePGBackup() {
    // getting db connection parameters from environment file
const username = process.env.DB_USERNAME;
const database = "WorkerService";
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbPass = process.env.DB_PASSWORD;

// defining backup file name
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const backupFile= `loan_system-${today}.tar`;

    await exec(`PGPASSWORD=${dbPass} pg_dump -U ${username} -F t LOAN_SYSTEM > /home/haphuthinh/${backupFile}`)
    console.log('Done create backup');
    
}

// calling postgresql backup function
