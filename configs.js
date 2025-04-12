import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST; 
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.DB_PWD;
const dbSettings = {host,user,database,password};

export default {...dbSettings}