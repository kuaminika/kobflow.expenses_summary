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
        let results = await   self.getSummaryForMonth({monthId:periodId,user_id});

        return results;
    }

    self.getSummaryForMonth = async function (periodId,user_id)
    {
        if(repository.constructor.name.indexOf("Income") >= 0 )
        {
            console.log({monthId:periodId,user_id});
            let results = await   repo.getAllIncomesForMonth({monthId:periodId,user_id});

            return results;rn 
        }


        let results = await   repo.getAllExpensesForMonth({monthId:periodId,user_id});

        return results;
    }


    self.getRecordsForMonthAndCategory = async function(periodId,user_id,category_id)
    {
           let results = await   repo.listRecordsForMonthAndCategory({monthId:periodId,user_id,category_id});

        return results;
    }

}


export default SummaryService;