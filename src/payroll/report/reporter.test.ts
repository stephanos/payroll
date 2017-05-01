import { Reporter } from './reporter';


describe('Reporter', () => {

    const reporter = new Reporter();

    it('should generate entry for single employee', () => {
        const report = reporter.generate([
            { employeeId: 1, date: new Date(2016, 0, 1), hoursWorked: 10, jobGroup: 'A' },
        ]);

        expect(report).toEqual({
            entries: [
                { amount: 200, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
            ]});
    });

    it('should generate entry for single employee with multiple work days', () => {
        const report = reporter.generate([
            { employeeId: 1, date: new Date(2016, 0, 1), hoursWorked: 10, jobGroup: 'A' },
            { employeeId: 1, date: new Date(2016, 0, 1), hoursWorked: 10, jobGroup: 'A' },
        ]);

        expect(report).toEqual({
            entries: [
                { amount: 400, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
            ]});
    });

    it('should generate two entries for single employee across multiple pay periods', () => {
        const report = reporter.generate([
            { employeeId: 1, date: new Date(2016, 0, 1), hoursWorked: 10, jobGroup: 'A' },
            { employeeId: 1, date: new Date(2016, 1, 23), hoursWorked: 10, jobGroup: 'A' },
        ]);

        expect(report).toEqual({
            entries: [
                { amount: 200, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
                { amount: 200, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 1, 16), end: new Date(2016, 1, 29) }},
            ]});
    });

    it('should generate entry per employee', () => {
        const report = reporter.generate([
            { employeeId: 1, date: new Date(2016, 0, 1),  hoursWorked: 10, jobGroup: 'A' },
            { employeeId: 2, date: new Date(2016, 0, 1),  hoursWorked: 10, jobGroup: 'B' },
        ]);

        expect(report).toEqual({
            entries: [
                { amount: 200, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
                { amount: 300, employeeId: 2, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
            ]});
    });

    it('should generate sorted entries per employee and pay periods', () => {
        const report = reporter.generate([
            { employeeId: 2, date: new Date(2016, 0, 3),  hoursWorked: 10, jobGroup: 'B' },
            { employeeId: 2, date: new Date(2016, 1, 25),  hoursWorked: 5, jobGroup: 'B' },
            { employeeId: 1, date: new Date(2016, 3, 22),  hoursWorked: 5, jobGroup: 'A' },
            { employeeId: 1, date: new Date(2016, 0, 1),  hoursWorked: 10, jobGroup: 'A' },
        ]);

        expect(report).toEqual({
            entries: [
                { amount: 200, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
                { amount: 100, employeeId: 1, payPeriod: {
                    begin: new Date(2016, 3, 16), end: new Date(2016, 3, 30) }},
                { amount: 300, employeeId: 2, payPeriod: {
                    begin: new Date(2016, 0, 1), end: new Date(2016, 0, 15) }},
                { amount: 150, employeeId: 2, payPeriod: {
                    begin: new Date(2016, 1, 16), end: new Date(2016, 1, 29) }},
            ]});
    });
});
