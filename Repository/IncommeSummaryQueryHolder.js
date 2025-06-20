function IncommeSummaryQueryHolder()
{
    const self = this;


    self.getAllIncomesPerMonthQuery = function()
    {
        return `
             select year_id,
            month_id, 
            day_id , 
            currency,
            user_id, 
            category , 
            sum(amount) as amount
            from (
                           SELECT 
                            c.name AS category,
                            e.amount AS amount,
                            YEAR(e.date) AS year_id,
                            CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0')) AS month_id,
                            CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0'), LPAD(DAYOFMONTH(e.date), 2, '0')) AS day_id,
                            cu.code AS currency,
                            e.user_id
                        FROM (
                            SELECT amount, user_id, date, category_id, currency_id
                            FROM Income
                            WHERE user_id = ?
                        ) AS e
                        JOIN IncomeCategory c ON e.category_id = c.id
                        JOIN Currency cu ON e.currency_id = cu.id            
            ) t
            group by year_id,month_id, day_id , currency,user_id, category         
        `
    }


    self.getAllIncomesForMonthQuery = function(){

        return ` select year_id,
        month_id, 
        day_id , 
        currency,
        user_id, 
        category , 
        sum(amount) as amount
        from (       
            SELECT 
                    c.name AS category,
                    e.amount AS amount,
                    YEAR(e.date) AS year_id,
                    CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0')) AS month_id,
                    CONCAT(YEAR(e.date), LPAD(MONTH(e.date), 2, '0'), LPAD(DAYOFMONTH(e.date), 2, '0')) AS day_id,
                    cu.code AS currency,
                    e.user_id
                FROM (
                    SELECT amount, user_id, date, category_id, currency_id
                    FROM Income
                    WHERE user_id = ? and  CONCAT(YEAR(date), LPAD(MONTH(date), 2, '0')) = ?
                ) AS e
                JOIN IncomeCategory c ON e.category_id = c.id
                JOIN Currency cu ON e.currency_id = cu.id        
        ) t
    group by year_id,month_id, day_id , currency,user_id, category `;


    }

}


export default IncommeSummaryQueryHolder;