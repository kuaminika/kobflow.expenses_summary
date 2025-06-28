function SummaryListItem(args) {
    args = args||{}
    let self = this;
    self.category =args.category|| "";
    self.amount = args.amount||0;
    self.monthid = args.month_id;
    self.id = args.id ||0;
    self.categoryId = args.categoryId||0;
    self.currencey = "CAD";
}

export default SummaryListItem;