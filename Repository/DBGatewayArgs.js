function DBGatewayArgs(args)
{
    args = args||{host:"",user:"",database:"", password:"",dbport:0}

    this.host = args.host;
    this.user = args.user;
    this.database = args.database;
    this.password = args.password;
    this.dbport = args.dbport;
}

export default DBGatewayArgs;