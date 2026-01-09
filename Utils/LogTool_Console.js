
// Define log levels
const levelsArr = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'];

function LogItem(options = {}) {
    const self = this;
    self.message = options.message || '';
    self.level = options.level || 1;
    self.timestamp = options.timestamp || new Date();
    self.location = options.location || '';
    self.action = options.action || '';
    self.application = options.application || ''; 
    self.service = options.service || '';
    self.id =  options.id || -1;
}


function LogFactory({application, service,action}) {
    const self = this;
    self.createLogItem = (data) => { 
        data.application = data.application || application;
        data.service = data.service || service;
        data.action = data.action || action;
        let result= new LogItem(data); 
        return result;
    }

}



function LogTool_Console({logFactory}) {

    const self = this;
    
    const formatLogMessage = (logItem) => {
        return `[${logItem.timestamp.toISOString()}] [${levelsArr[logItem.level]}] [${logItem.location}] ${logItem.message}`;
    };

    self.log = (message) => { // Default to INFO level (2)
    
        const logItem = logFactory.createLogItem({ message, level:2});
        const formattedMessage = formatLogMessage(logItem);
        console.log(formattedMessage);
    };

    self.info = (message) => {
        const logItem = logFactory.createLogItem({ message, level: 2 }); // INFO level
        const formattedMessage = formatLogMessage(logItem);
        console.info(formattedMessage);
    };

    self.error = (message) => {
        const logItem = logFactor.createLogItem({ message, level: 4 }); // ERROR level
        const formattedMessage = formatLogMessage(logItem);
        console.error(formattedMessage);
    };

    self.warn = (message) => {
        const logItem = logFactory.createLogItem({ message, level: 3 }); // WARN level
        const formattedMessage = formatLogMessage(logItem);
        console.warn(formattedMessage);
    };

    self.critical = (message) => {
        const logItem = logFactory.createLogItem({ message, level: 5 }); // CRITICAL level
        const formattedMessage = formatLogMessage(logItem);
        console.error(`CRITICAL: ${formattedMessage}`);
    };

    self.trace = (message) => {
        const logItem = logFactory.createLogItem({ message, level: 0 }); // TRACE level
        const formattedMessage = formatLogMessage(logItem);
        console.trace(formattedMessage);
    };

    self.debug = (message) => {
        const logItem = logFactory.createLogItem({ message, level: 1 }); // DEBUG level
        const formattedMessage = formatLogMessage(logItem);
        console.debug(formattedMessage);
    };

    return self;
}

export { LogTool_Console, LogFactory,levelsArr };