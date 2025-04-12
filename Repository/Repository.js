function Repository(dbgateWay)
{
    const self = this;
    

    self.getAllExpensesForMonth = async function(monthId)
    {
        
        let raw = await dbgtw.doProcedure("ExpensesPerCategory",["month"]);
        

    }
}