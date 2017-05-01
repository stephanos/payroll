import * as moment from 'moment';

import * as PapaParse from 'papaparse';

import { ITimeReport } from './model';


class Parser {

    private dateFormat = 'DD-MM-YYYY';
    private validJobGroups = ['A', 'B'];

    public parseCSV(csv: string): ITimeReport {
        const parsed = PapaParse.parse(csv.trim(), { dynamicTyping: true });
        const footer = parsed.data.slice(-1)[0];
        const entries = parsed.data.slice(1, -1);
        return {
            entries: entries.map((entry) => {
                const jobGroup = entry[3];
                this.validateJobGroup(jobGroup);
                return {
                    date: moment(entry[0], this.dateFormat).toDate(),
                    employeeId: entry[2],
                    hoursWorked: entry[1],
                    jobGroup,
                };
            }),
            id: footer[1],
        };
    }

    private validateJobGroup(jobGroup: string) {
        if (this.validJobGroups.indexOf(jobGroup) === -1) {
            throw new Error(`invalid job group '${jobGroup}'`);
        }
    }
}


export { Parser };
