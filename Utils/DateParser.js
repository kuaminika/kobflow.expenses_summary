function DateParser() {
    const self = this;

    self.parseYYYYMMDD = parseYYYYMMDD;
    self.formatToYYYYMMDD = formatToYYYYMMDD;
    self.isValidYYYYMMDD = isValidYYYYMMDD;
    self.addDays = addDays;

    // Private helper (not exposed)
    function createDate(year, month, day) {
        return new Date(year, month - 1, day);
    }

    // Public methods
    function parseYYYYMMDD(dateStr, options = {}) {
        const { throwOnError = false, utc = false } = options;
        
        if (!isValidYYYYMMDD(dateStr)) {
            if (throwOnError) {
                throw new Error(`Invalid date format: ${dateStr}. Expected yyyyMMdd`);
            }
            return null;
        }
        
        const year = parseInt(dateStr.substring(0, 4), 10);
        const month = parseInt(dateStr.substring(4, 6), 10);
        const day = parseInt(dateStr.substring(6, 8), 10);
        
        let date;
        if (utc) {
            date = new Date(Date.UTC(year, month - 1, day));
        } else {
            date = createDate(year, month, day);
        }
        
        // Validate the date is valid
        if (date.getFullYear() !== year || 
            date.getMonth() !== month - 1 || 
            date.getDate() !== day) {
            if (throwOnError) {
                throw new Error(`Invalid date: ${dateStr}`);
            }
            return null;
        }
        
        return date;
    }

    function formatToYYYYMMDD(date) {
        if (!(date instanceof Date) || isNaN(date)) {
            return null;
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}${month}${day}`;
    }

    function isValidYYYYMMDD(dateStr) {
        return typeof dateStr === 'string' && /^\d{8}$/.test(dateStr);
    }

    function addDays(dateStr, days) {
        const date = parseYYYYMMDD(dateStr);
        if (!date) return null;
        
        date.setDate(date.getDate() + days);
        return formatToYYYYMMDD(date);
    }

    // Optional: Chainable methods for fluid API
    self.fromString = function(str) {
        this.currentDate = parseYYYYMMDD(str);
        return this;
    };

    self.toString = function() {
        return this.currentDate ? formatToYYYYMMDD(this.currentDate) : null;
    };

    self.add = function(days) {
        if (this.currentDate) {
            this.currentDate.setDate(this.currentDate.getDate() + days);
        }
        return this;
    };
}

export default DateParser;