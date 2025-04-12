
import DBGateway from "./Repository/DBGateway.js"
import Repository from "./Repository/Repository.js";
 

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


    self.getArgsForService = function()
    {
        let repoArg = self.getArgsForRepository();
        let repo = new Repository(repoArg);
        return repo;
    }
}


export default  Container;