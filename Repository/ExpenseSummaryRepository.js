import MonthlySummary from "../Models/MonthlySummary.js";
import SummryListItem from "../Models/SummaryListItem.js";
function ExpenseSummaryRepository(dbgateWay)
{
    const self = this;
    
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
}

export default ExpenseSummaryRepository;