// import express from "express";
import Container from "./Container.js";
import DBGatewayTest  from "./Repository/DBGatewayTest.js"
import RepositoryTester from "./Repository/ExpenseSummaryRepository.js";
import SummaryServiceTester from "./SummaryServiceTester.js";
import dotenv from 'dotenv';
dotenv.config();

// const app = express();
const {dbGatewayTester }= DBGatewayTest
const line = "--------------------------------------------------------------------------------------------------------------------------------------------------------------";



const host = process.env.DB_HOST; 
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.DB_PWD;
const dbSettings = {host,user,database,password};

const container = new Container(dbSettings);

// dbGatewayTester.settings = dbSettings;
// console.log(dbGatewayTester);
// await dbGatewayTester.testConnect();
// console.log(line);

// await dbGatewayTester.testQuery("")
// console.log(line);

// dbGatewayTester.testProcedure();

// const rpTstr = new RepositoryTester(dbSettings);


// await rpTstr.testGettingForMonths();
// console.log(line);

// await rpTstr.testGettingForCurrentMonth();


 
const st = new SummaryServiceTester(container);


console.log(line);

await st.testCurrentMonth();

console.log(line);

await st.testPreviousMonth();

console.log(line);

st.testAllRecordsForMonthAndCategory1();
