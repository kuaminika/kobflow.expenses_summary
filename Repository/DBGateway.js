// Get the client
import mysql from 'mysql2/promise';
import DBGatewayArgs from "./DBGatewayArgs.js";


function MySQL_DBGateway(args)
{
    
    const {host , user ,database,password} = args;
    const self = this;

    function connect()

    {
 
        const p = new Promise((acc,rej)=>{
            const connection =  mysql.createConnection( {host , user ,database,password});

            connection.catch(rej);
            connection.then(acc);

        })
        
        return p;
      
    }
    //TODO: enhance this by wrapping calle to connect --- > urgent:low, important: medium
    self.testConnect = connect;

    self.doProcedure = function(procedureName,paramArray)
    {
        const connectionP =  connect();
        let conn;

        const executionPromise = connectionP.then(c=>{
            conn = c;
            const executionP  =  conn.execute(`CALL ${procedureName}(?)`,paramArray);
            return executionP;          
         })
       
        const promiseWithResults =  executionPromise.then(result=>{
                 
            return  conn.end().then(()=>{
                                               return result;
                                       });
        });

        return promiseWithResults;
        
    }

    self.doQuery =    function(query_args){
     

        const p = new Promise((acc,rej)=>{
          
                try{
                    const {queryStr} = query_args;
                    const connectionP =  connect();
                    connectionP.then(conn=>{
                       let qP =  conn.query(queryStr);
                    
                        qP.then(acc);
                        qP.catch(rej);
                    
                    
                    }); 
                    connectionP.catch(rej);

                }
                catch(err)
                {
                  rej(err);
                }
        })
        
        return p;




    }
}
  
//exports.dbGateway  = new MySQL_DBGateway();
export default {MySQL_DBGateway,DBGatewayArgs};