function SummaryListItem(args) {
    args = args||{}
    let self = this;
    self.category =args.category|| "";
    self.amount = args.amount||0;
    self.id = args.id ||0;
    self.currencey = "CAD";
}

export default SummaryListItem;