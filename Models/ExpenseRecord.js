function ExpenseRecord(args) {
  args = args || {};
  let self = this;

  self.year_id = args.year_id || 0;
  self.month_id = args.month_id || "";
  self.currency = args.currency || "CAD";
  self.OwnerId = args.OwnerId || 0;
  self.CategoryName = args.CategoryName || "";
  self.Amount = args.Amount || 0;
  self.MerchantName = args.MerchantName || "";
  self.CategoryId = args.CategoryId || 0;
  self.Description = args.Description || "";
  self.CreatedDate = args.CreatedDate ? new Date(args.CreatedDate) : null;
  self.KobHolderName = args.KobHolderName || "";
}
export default ExpenseRecord;