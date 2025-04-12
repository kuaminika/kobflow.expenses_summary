import Repository from "./Repository.js"
import DBGateway from "./DBGateway.js"

const {MySQL_DBGateway,DBGatewayArgs}= DBGateway;

function RepositoryTester(settings)
{
    let args = new DBGatewayArgs(settings);
    let dbgtw = new MySQL_DBGateway(args);
    let repository = new Repository(dbgtw);

    const self = this;

    self.testGettingForMonths = async function(){
   
        console.log(`self.testGettingForMonths `);
       const xp_months = await  repository.getAllExpensesForMonths();


       console.log(xp_months)
       
       console.log(` done with self.testGettingForMonths `);
    }


    self.testGettingForCurrentMonth = async function()
    {

        console.log(`self.testGettingForCurrentMonth`);
        const today = new Date();
        let monthNo = today.getMonth()+1;
        
        const monthId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        const xp_months = await  repository.getAllExpensesForMonth(monthId);
        console.log(xp_months)
        console.log(`done with self.testGettingForCurrentMonth`);
    }

}


export default RepositoryTester;