import MonthlySummary from "../Models/MonthlySummary.js";
import SummryListItem from "../Models/SummaryListItem.js";


function IncomeSummaryRepository(args)
{

    const dbgateWay= args.dbgateWay;
    const mainUser_id = args.user_id;
    const queryHolder= args.queryHolder;

    const self = this;

      

    self.getAllIncomesPerMonthMonth = async function(user_id)
    {
        user_id = user_id|| mainUser_id;
        if(!user_id) throw "user_id is missing";

        const queryStr= queryHolder.getAllIncomesPerMonthQuery(); 
      
        let arr = [];

        let raw = await  dbgateWay.doQuery({queryStr, params: [user_id]});
        raw.forEach(element => {
                let item = new  SummryListItem(element);
                item.id = arr.length+1;
                
                arr.push(item);
            });
        const result = new MonthlySummary();
            result.type = "Income";
        result.list = arr;

        return result;

    }


    self.getAllIncomesForMonth = async function({monthId,user_id})
    {

        user_id = user_id|| mainUser_id; 
        if(!user_id) throw "user_id is missing";
       
        if(!monthId)    return self.getAllIncomesPerMonthMonth(user_id);
      
        const queryStr= queryHolder.getAllIncomesForMonthQuery()
 
        let raw = await  dbgateWay.doQuery({queryStr, params: [user_id,monthId]});
      
        let arr = [];

        raw.forEach(element => {
          let item = new  SummryListItem(element);
          item.id = arr.length+1;
          arr.push(item);
        });
        const result = new MonthlySummary();
        result.type = "Income";
        result.list = arr;
        result.period = monthId;

        return result;
    }
}
export default IncomeSummaryRepository;