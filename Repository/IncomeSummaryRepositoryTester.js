import IncomeSummaryRepository from "./IncomeSummaryRepository.js"
import IncommeSummaryQueryHolder from "./IncommeSummaryQueryHolder.js"
import DBGateway from "./DBGateway.js"

const {MySQL_DBGateway,DBGatewayArgs}= DBGateway;

function RepositoryTester(settings)
{
    let args = new DBGatewayArgs(settings);
    let dbgtw = new MySQL_DBGateway(args);
    let  queryHolder = new IncommeSummaryQueryHolder();
    let repository = new IncomeSummaryRepository({dbgateWay: dbgtw, user_id : 1,queryHolder});

    const self = this;

    self.testGettingForMonths = async function(){
   
        console.log(`self.testGettingForMonths `);
       const xp_months = await  repository.getAllIncomesPerMonthMonth();


       console.log(xp_months)
       
       console.log(` done with self.testGettingForMonths `);
    }


    self.testGettingForCurrentMonth = async function()
    {

        console.log(`self.testGettingForCurrentMonth`);
        const today = new Date();
        let monthNo = today.getMonth()+1;
        
        const monthId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`;
        console.log({monthId})
        const xp_months = await  repository.getAllIncomesForMonth({monthId});
        console.log(xp_months)
        console.log(`done with self.testGettingForCurrentMonth`);
    }

}


export default RepositoryTester;