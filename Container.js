
import DBGateway from "./Repository/DBGateway.js"
import Repository from "./Repository/ExpenseSummaryRepository.js";
import IncomeSummaryRepository from "./Repository/IncomeSummaryRepository.js";
import IncommeSummaryQueryHolder from "./Repository/IncommeSummaryQueryHolder.js";
 
 

const {MySQL_DBGateway,DBGatewayArgs}= DBGateway;

function Container(settings)
{
    const self = this;

    self.getArgsForRepository = function()
    {
        
        let args = new DBGatewayArgs(settings);
        let dbgtw = new MySQL_DBGateway(args);
        return dbgtw;
    }

    self.getArgsForService_Income = function({user_id}){
   
        let args = new DBGatewayArgs(settings);
        let dbgtw = new MySQL_DBGateway(args);
        let  queryHolder = new IncommeSummaryQueryHolder();
        let repository = new IncomeSummaryRepository({dbgateWay: dbgtw, user_id : user_id,queryHolder});
        return repository;
    };

    self.getArgsForService = function({user_id})
    {
        let repoArg = self.getArgsForRepository();
        let repo = new Repository(repoArg);
        return repo;
    }
}


export default  Container;