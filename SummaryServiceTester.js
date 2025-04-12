
import SummaryService from "./SummaryService.js";

function SummaryServiceTester(container)
{
    const self = this;

    const repo = container.getArgsForService();
    const service = new SummaryService(repo);

    self.testCurrentMonth =function()
    {
        console.log("  self.testCurrentMonth")
        service.getCurrentMonthlySummary().then(console.log);
        console.log("done with  self.testCurrentMonth")
    }

    self.testPreviousMonth =function()
    {
        const today = new Date();
        let monthNo = today.getMonth();
        const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        
        console.log("  self.testPreviousMonth")
        service.getSummaryForMonth(periodId).then(console.log);
        console.log("done with  self.testPreviousMonth")
    }
}

export default SummaryServiceTester;