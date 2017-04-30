import * as moment from 'moment';
import { ITimeReportEntry } from '../track';

import { IPayrollReport, IPayrollReportEntry } from './model';


class Reporter {

    public generate(timeEntries: ITimeReportEntry[]): IPayrollReport {
        const payrollMap = new Map<string, IPayrollReportEntry>();
        timeEntries.forEach((timeEntry) => {
            const payment = this.paymentFor(timeEntry.hoursWorked, timeEntry.jobGroup);
            const period = this.periodFor(timeEntry.date);
            const sortKey = `${timeEntry.employeeId}_${period.begin}`;
            const entry: IPayrollReportEntry = payrollMap.get(sortKey) || {
                amount: 0.0,
                employeeId: timeEntry.employeeId,
                payPeriod: period,
            };
            entry.amount += payment;
            payrollMap.set(sortKey, entry);
        });

        return { entries: Array.from(payrollMap.values()) };
    }

    private periodFor(date: Date) {
        if (moment(date).date() <= 15) {
            return {
                begin: moment(date).date(1).toDate(),
                end: moment(date).date(15).toDate(),
            };
        } else {
            return {
                begin: moment(date).date(16).toDate(),
                end: moment(date).date(moment(date).daysInMonth()).toDate(),
            };
        }
    }

    private paymentFor(hoursWorked: number, jobGroup: string) {
        switch (jobGroup) {
            case 'A':
                return hoursWorked * 20;
            case 'B':
                return hoursWorked * 30;
            default:
                throw new Error(`unknown job group '${jobGroup}'`);
        }
    }
}


export { Reporter };
