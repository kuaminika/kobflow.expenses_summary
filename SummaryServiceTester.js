
import SummaryService from "./SummaryService.js";

function SummaryServiceTester(container,incomeMode)
{
    const self = this;
    const user_id = 1;

    const args =!incomeMode? container.getArgsForService({user_id}): container.getArgsForService_Income({user_id});
    const service = new SummaryService(args);

    self.testCurrentMonth = async function()
    {
        console.log("  self.testCurrentMonth")
      await  service.getCurrentMonthlySummary().then(console.log);
        console.log("done with  self.testCurrentMonth")
    }

    self.testPreviousMonth = async function()
    {
        const today = new Date();
        let monthNo = today.getMonth();
        const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        
        console.log("  self.testPreviousMonth")
      await  service.getSummaryForMonth(periodId).then(console.log);
        console.log("done with  self.testPreviousMonth")
    }



    self.testAllRecordsForMonthAndCategory1 = async function()
    {

        if(incomeMode) return;
   const today = new Date();
        let monthNo = today.getMonth()+1;
        const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`;
                console.log("  self.testAllExpensesForMonthAndCategory1")
      await  service.getRecordsForMonthAndCategory(periodId,1,1).then(console.log);
        console.log("done with  self.testAllExpensesForMonthAndCategory1")
    }

    self.testDateRange = async function()
    {
      
        if(incomeMode) return;
        const lastPayDate = new Date(2025,11,26);
        const nextPayDate = addDays(lastPayDate,14);

                console.log("  self.testDateRange")
        await service.getSummaryForRange({dateA:lastPayDate,dateB:nextPayDate,userId:1}).then(console.log);
                console.log("  done with self.testDateRange")
    }

    const addDays = (date, days) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };
}

export default SummaryServiceTester;