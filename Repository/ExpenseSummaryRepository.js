import MonthlySummary from "../Models/MonthlySummary.js";
import SummryListItem from "../Models/SummaryListItem.js";
import ExpenseRecord from "../Models/ExpenseRecord.js"
function ExpenseSummaryRepository(args)
{
    const self = this; 

    const dbgateWay= args.dbgateWay;
    const mainUser_id = args.user_id;
    const queryHolder= args.queryHolder;



    self.getAllExpensesForMonth = async function(monthid)
    {
        let raw = await dbgateWay.doProcedure("ExpensesPerCategory_month",[monthid]);
        let arr = [];

        raw.forEach(element => {
          let item = new  SummryListItem(element);
          item.id = arr.length+1;
          arr.push(item);
        });
        const result = new MonthlySummary();
        result.list = arr;
        result.period = monthid;

        return result;
    }

    // this gets expense summaries grouped by month 
    self.getAllExpensesForMonths = async function()
    {
        
        let raw = await dbgateWay.doProcedure("ExpensesPerCategory",["month"]);
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

console.log({user_id,monthId,category_id});

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