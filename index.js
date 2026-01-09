import configs from "./configs.js";
import Container from "./Container.js";
import DateParser from "./Utils/DateParser.js";
import SummaryService from "./SummaryService.js";
import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
app.use(express.json());

console.log(configs);
app.use(cors()); // No restrictions
const container = new Container(configs);
const dateParser = new DateParser();

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
  
      //TODO: add a different to identify the user
  const repo = container.getArgsForService({user_id:1});
  const service = new SummaryService(repo);
  let result = await  service.getCurrentMonthlySummary();
   res.send(result);
});


app.get("/api/summary/previousMonth",async (req,res)=>{
  
      //TODO: add a different to identify the user
  const repo = container.getArgsForService({user_id:1});
  const service = new SummaryService(repo);
  const today = new Date();
   let monthNo = today.getMonth();
    const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        
        console.log("  self.testPreviousMonth")
  let result =     await  service.getSummaryForMonth(periodId);

 // let result = await  service.getPreviousMonthlySummary();
   res.send(result);
});



app.get("/api/summary/range/:user_id/:date_id1/:date_id2",async (req,res)=>{

    const {date_id1,date_id2,user_id} = req.params;
    
 
      const service = new SummaryService(container.getArgsForService({user_id}));
   
    let dateA = dateParser.parseYYYYMMDD(date_id1);
    let dateB = dateParser.parseYYYYMMDD(date_id2);
    let userId = user_id;
    let result =await  service.getSummaryForRange({dateA,dateB,userId});


     res.send(result);



});

app.get("/api/summary/previousMonth_income",async (req,res)=>{
  
      //TODO: add a different to identify the user
      const repo = container.getArgsForService_Income({user_id:1});
    const service = new SummaryService(repo);
    let result = await  service.getPreviousMonthlySummary();
     res.send(result);
  });
  
  

  app.get("/api/summary/latestMonth_income",async (req,res)=>{
      //TODO: add a different to identify the user
      const repo = container.getArgsForService_Income({user_id:1});
      const service = new SummaryService(repo);
      let result = await  service.getCurrentMonthlySummary();
       res.send(result);
    });
    
  

  app.get("/api/listingPerCategory/:monthId/:categoryId",async (req,res)=>{
   
  const user_id = 1;

  const repo = container.getArgsForService({user_id});
  const service = new SummaryService(repo);
  service
      const {monthId,categoryId} = req.params;
   const result =   await  service.getRecordsForMonthAndCategory(monthId,user_id,categoryId);



       res.send(result);
    });
    


app.listen(configs.port, () => {
    console.log(`Server is running at http://localhost:${configs.port}/`);
  });
