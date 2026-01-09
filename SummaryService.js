function SummaryService(args)
{

    const self  =this;
    const repo = args.repository;
    const logTool = args.logTool;

    console.log(args)

    self.getSummaryForRange = async function({dateA,dateB,userId})
    {
       
        try
        {
            logTool.log("starting getSummaryForRange from service");
            logTool.log(`args: dateA:${dateA},dateB:${dateB},userId:${userId}`)
            let dayIdA = generateDateId(dateA);
            let dayIdB = generateDateId(dateB);
          logTool.log(`repoargs: dayIdA:${dayIdA},dayIdB:${dayIdB},userId:${userId}`)
      

            let results = await repo.getSummaryForRange({dayIdA,dayIdB,userId});
        return results;

        }
        catch(err){
                console.error(err)
                return [];

        }
    }

    function generateDateId(date)
    {
         const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

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
        if(repo.constructor.name.indexOf("Income") >= 0 )
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