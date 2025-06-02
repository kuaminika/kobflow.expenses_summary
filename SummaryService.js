function SummaryService(repository)
{

    const self  =this;
    const repo = repository;

    self.getCurrentMonthlySummary = async function()
    {
        const today = new Date();
        let monthNo = today.getMonth()+1;
        const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        let results = await   self.getSummaryForMonth(periodId);

        return results;
    }
    self.getPreviousMonthlySummary = async function()
    {
        const today = new Date();
        let monthNo = today.getMonth();
        const periodId = `${today.getFullYear()}${monthNo.toString().padStart(2,'0')}`
        let results = await   self.getSummaryForMonth(periodId);

        return results;
    }

    self.getSummaryForMonth = async function (periodId)
    {
        let results = await   repo.getAllExpensesForMonth(periodId);

        return results;
    }


}


export default SummaryService;