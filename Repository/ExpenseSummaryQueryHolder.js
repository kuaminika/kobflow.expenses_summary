function ExpenseSummaryQueryHolder()
{
    const self = this;


    self.getAllExpensesForMonthAndCategory = function()
    {
        return `  select year_id,
                    month_id, 
                    currency,
                    user_id as OwnerId, 
                    CategoryName, 
                    Amount,
                    MerchantName,
                    CategoryId,
                    Description,
                    CreatedDate,
                    KobHolderName
                        from (
                                    SELECT 
                                        c.name as CategoryName,
                                        e.amount AS Amount,
                                        YEAR(e.date) AS year_id,
                                        CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0')) AS month_id,
                                        CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0'), LPAD(DAYOFMONTH(e.date), 2, '0')) AS day_id,
                                        cu.code AS Currency,
                                        e.user_id  ,
                                        e.category_id  as CategoryId,
                                        en.name  as MerchantName,
                                        e.description as Description,
                                        en.id as MerchantId,
                                        e.date as CreatedDate,
                                        k.name as KobHolderName
                                    FROM (
                                        SELECT amount, user_id, date, category_id, currency_id,store_id,description ,account_id
                                        FROM Expense
                                        WHERE user_id = ? and  CONCAT(YEAR(date), LPAD(MONTH(date), 2, '0')) = ? and category_id = ?
                                    ) AS e
                                    JOIN  Category c ON e.category_id = c.id
                                    JOIN Currency cu ON e.currency_id = cu.id   
                                    INNER JOIN kobHolder k on k.id = e.account_id   
                                    JOIN Entity en on e.store_id = en.id
                        ) t`;
    }

    self.getAllPerMonthQuery = function()
    {
         return ` select year_id,
                    month_id,                 
                    currency,
                    user_id, 
                    category , 
                    category_id as categoryId,
                    sum(amount) as amount
                    from (       
                        SELECT 
                                c.name AS category,
                                e.category_id,
                                e.amount AS amount,
                                YEAR(e.date) AS year_id,
                                CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0')) AS month_id,
                                CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0'), LPAD(DAYOFMONTH(e.date), 2, '0')) AS day_id,
                                cu.code AS currency,
                                e.user_id
                            FROM (
                                SELECT amount, user_id, date, category_id, currency_id
                                FROM Expense
                                WHERE user_id = ? 
                            ) AS e
                            JOIN Category c ON e.category_id = c.id
                            JOIN Currency cu ON e.currency_id = cu.id        
                    ) t
                group by year_id,month_id, currency,user_id, category `;
    }


    self.getGroupByCategoryForMonthQuery = function(){

        return ` select year_id,
        month_id, 
    
        currency,
        user_id, 
        category , 
        category_id as categoryId,
        sum(amount) as amount
        from (       
            SELECT 
                    c.name AS category,
                    e.category_id,
                    e.amount AS amount,
                    YEAR(e.date) AS year_id,
                    CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0')) AS month_id,
                    CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0'), LPAD(DAYOFMONTH(e.date), 2, '0')) AS day_id,
                    cu.code AS currency,
                    e.user_id
                FROM (
                    SELECT amount, user_id, date, category_id, currency_id
                    FROM Expense
                    WHERE user_id = ? and  CONCAT(YEAR(date), LPAD(MONTH(date), 2, '0')) = ?
                ) AS e
                JOIN Category c ON e.category_id = c.id
                JOIN Currency cu ON e.currency_id = cu.id        
        ) t
    group by year_id,month_id, currency,user_id, category,category_id `;


    }

}


export default ExpenseSummaryQueryHolder;