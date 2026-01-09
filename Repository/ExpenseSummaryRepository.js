import MonthlySummary from "../Models/MonthlySummary.js";
import SummryListItem from "../Models/SummaryListItem.js";
import ExpenseRecord from "../Models/ExpenseRecord.js"
import DateRange from "../Models/DateRangeModel.js";
function ExpenseSummaryRepository(args)
{
    const self = this; 

    const dbgateWay= args.dbgateWay;
    const mainUser_id = args.user_id;
    const queryHolder= args.queryHolder;
    const logTool = args.logTool; 

    self.getSummaryForRange = async function({dayIdA,dayIdB,userId})
    {
        
            logTool.log("starting getSummaryForRange from repository");
        const queryStr= queryHolder.getSummaryForRange(); 
        let raw = await dbgateWay.doQuery({queryStr,params:[userId,dayIdA,dayIdB]});
       let arr = [];
       let periodId = `${dayIdA}-${dayIdB}`;
        raw.forEach(element => {
       
          let item = new  SummryListItem(element);
          item.id = arr.length+1;
          item.monthid = periodId;
          arr.push(item);
        });
        const result = new DateRange();
        result.list = arr;
        result.period = `${dayIdA}-${dayIdB}`;
        return result;

    }

    self.getAllExpensesForMonth = async function({user_id,monthId})
    {

 user_id = user_id|| mainUser_id;
      
        console.log({user_id,monthId});
        const queryStr= queryHolder.getGroupByCategoryForMonthQuery(); 
       
        let raw = await dbgateWay.doQuery({queryStr,params:[user_id,monthId]}); 
         let arr = [];

        raw.forEach(element => {
       
          let item = new  SummryListItem(element);
          item.id = arr.length+1;
          arr.push(item);
        });
        const result = new MonthlySummary();
        result.list = arr;
        result.period = monthId;

        return result;
    }

    // this gets expense summaries grouped by month 
    self.getAllExpensesForMonths = async function({user_id})
    {
        user_id = user_id|| mainUser_id;
      
        const queryStr= queryHolder.getAllPerMonthQuery(); 
      
       
      let raw = await dbgateWay.doQuery({queryStr, params: [user_id]});
      let arr = [];
        raw.forEach(element => {
          let item = new  SummryListItem(element);
         // item.id = element.month_id;
          arr.push(item);
        });

        return arr;

    }


    self.listRecordsForMonthAndCategory = async function({user_id,monthId,category_id})
    {
        user_id = user_id|| mainUser_id;
        if(!user_id) throw "user_id is missing";

       // console.log({user_id,monthId,category_id});

        const queryStr= queryHolder.getAllExpensesForMonthAndCategory(); 
      
        let arr = [];

        let raw = await  dbgateWay.doQuery({queryStr, params: [user_id,monthId,category_id]});
        raw.forEach(element => {
                let item = new  ExpenseRecord(element);
                item.id = arr.length+1;
                
                arr.push(item);
            });
    

        return arr;

    }
}

export default ExpenseSummaryRepository;