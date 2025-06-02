import configs from "./configs.js";
import Container from "./Container.js";
import SummaryService from "./SummaryService.js";
import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
app.use(express.json());

console.log(configs);
app.use(cors()); // No restrictions
const container = new Container(configs);
const repo = container.getArgsForService();
const service = new SummaryService(repo);

app.get('/', (req, res) => {


    res.send('Hello from ES Module Express!');
  });


  app.get('/IPData', (req, res) => {

    axios.get('https://api.ipify.org?format=json')
    .then(res => console.log("Public IP is:", res.data.ip));
    
    res.send('It is consoled');
  });
//container.getArgsForService()

app.get("/api/summary/latestMonth",async (req,res)=>{
  
  let result = await  service.getCurrentMonthlySummary();
   res.send(result);
});


app.get("/api/summary/previousMonth",async (req,res)=>{
  
  let result = await  service.getPreviousMonthlySummary();
   res.send(result);
});



app.listen(configs.port, () => {
    console.log(`Server is running at http://localhost:${configs.port}/`);
  });