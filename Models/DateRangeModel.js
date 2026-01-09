function DateRange()
{
    let self = this;

    self.type = "Expense";
    self.periodType = "Range";
    self.period = "dayid_A-dayid_B";//no period chosen
   
    self.list = [];//empty list for now
}


export default DateRange;