import * as moment from 'moment';

import * as PapaParse from 'papaparse';

import { ITimeReport } from './model';


class Parser {

    private dateFormat = 'DD-MM-YYYY';

    public parseCSV(csv: string): ITimeReport {
        const parsed = PapaParse.parse(csv.trim(), { dynamicTyping: true });
        const footer = parsed.data.slice(-1)[0];
        const entries = parsed.data.slice(1, -1);
        return {
            entries: entries.map((entry) => {
                return {
                    date: moment(entry[0], this.dateFormat).toDate(),
                    employeeId: entry[2],
                    hoursWorked: entry[1],
                    jobGroup: entry[3],
                };
            }),
            id: footer[1],
        };
    }
}


export { Parser };
