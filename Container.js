
import DBGateway from "./Repository/DBGateway.js"
import ExpenseSummaryQueryHolder from "./Repository/ExpenseSummaryQueryHolder.js";
import Repository from "./Repository/ExpenseSummaryRepository.js";
import IncomeSummaryRepository from "./Repository/IncomeSummaryRepository.js";
import IncommeSummaryQueryHolder from "./Repository/IncommeSummaryQueryHolder.js";
import {LogTool_Console,LogFactory} from "./Utils/LogTool_Console.js";
 

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
        let logTool = new LogTool_Console({logFactory:new LogFactory({application:"Kobflow",service:"Summary"})});
        let repository = new IncomeSummaryRepository({dbgateWay: dbgtw, user_id : user_id,queryHolder,logTool});
        return repository;
    };

    self.getArgsForService = function({user_id})
    {
       
        let args = new DBGatewayArgs(settings);
        let dbgtw = new MySQL_DBGateway(args);
        let  queryHolder = new ExpenseSummaryQueryHolder();
        let logFactory = new LogFactory({application:"Kobflow",service:"Summary"});
        console.log("user:",user_id)
        let logTool = new LogTool_Console({logFactory});
        let repository = new Repository({dbgateWay: dbgtw, user_id : user_id,queryHolder,logTool});
        return {repository, logTool: new LogTool_Console({logFactory}) };
    }
}


export default  Container;