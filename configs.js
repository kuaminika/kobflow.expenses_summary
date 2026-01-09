import dotenv from 'dotenv';
dotenv.config();
const port = process.env.HTTP_PORT;
const host = process.env.DB_HOST; 
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const dbport = process.env.DB_PORT;
const password = process.env.DB_PWD;
const dbSettings = {host,user,database,password,dbport};

export default {...dbSettings,port}