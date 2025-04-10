import DBGateway from "./DBGateway.js"

const {MySQL_DBGateway,DBGatewayArgs}= DBGateway;


const tester = {}
tester.settings = {};


tester.testQuery =  function(query){


    console.log("will do query");
 
    let args = new DBGatewayArgs(tester.settings);
    let dbgtw = new MySQL_DBGateway(args);
    // console.log(dbgtw);
    const queryStr = "SELECT e.id,c.name,sum(e.amount)as `total ` , count(e.id) as `total transactions` FROM `Expense` e inner join Category c on e.category_id = c.id group by e.category_id;";
    let p = dbgtw.doQuery({queryStr});
    p.catch(console.error);
    p.then(results=>{

        console.log("Query test is succesfull results are:",results);

    })



}



tester.testConnect = function(showConnObj){


    console.log("will do connect");
 
  


    let args = new DBGatewayArgs(tester.settings);
    let dbgtw = new MySQL_DBGateway(args);
    // console.log(dbgtw);

    const testConnect = dbgtw.testConnect();
    testConnect.catch(err=>{
        console.log("It did not work:");
        console.log(err);
    });
    testConnect.then(conn=>{
        console.log("Connection test is succesfull:");
        if(!showConnObj) return;
         console.log(conn);
    });
    
    
}





export default { dbGatewayTester : tester }