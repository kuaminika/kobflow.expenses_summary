function MonthlySummary()
{
    let self = this;

    self.type = "Expense";
    self.periodType = "Month";
    self.period = -1;//no period chosen
    self.list = [];//empty list for now
}


export default MonthlySummary;