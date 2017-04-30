import { Parser } from './parser';


describe('TimeReportParser', () => {

    it('should parse valid payroll report CSV', () => {
        const report = new Parser().parseCSV(
`date,hours worked,employee id,job group
14/11/2016,7.5,1,A
9/11/2016,4,2,B
10/11/2016,4,2,B
report id,43,,`);

        expect(report).toEqual(
            { entries: [
                { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
                { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
                { date: new Date(2016, 10, 10), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
                ],
            id: 43 });
    });

    it('should parse payroll report CSV with whitespace at start and end', () => {
        const report = new Parser().parseCSV(
`
date,hours worked,employee id,job group
10/11/2016,4,2,B
report id,43,,
`);

        expect(report).toEqual(
            { entries: [
                { date: new Date(2016, 10, 10), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
                ],
            id: 43 });
    });

    it('should parse empty payroll report CSV', () => {
        const report = new Parser().parseCSV(
`date,hours worked,employee id,job group
report id,43,,`);

        expect(report).toEqual({ entries: [], id: 43 });
    });
});
