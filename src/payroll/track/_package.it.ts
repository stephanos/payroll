import { Database } from '../../data/database';
import { createDB } from '../../data/test-support';

import { DuplicateReportError } from './error';
import { createPayrollTimeTrackService, PayrollTimeTrackService } from './index';


describe('PayrollTimeTrackService', () => {

    let db: Database;
    let service: PayrollTimeTrackService;

    beforeEach(async () => {
        db = new Database('test_' + new Date().getTime());
        await createDB(db);

        service = createPayrollTimeTrackService(db);
    });

    it('should import time report', async () => {
        await service.import({
            entries: [
                { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
                { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
            ],
            id: 1,
        });

        const entries = await service.load();

        expect(entries).toEqual([
            { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
            { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
        ]);
    });

    it('should import time report from CSV', async () => {
        await service.importCSV(
`date,hours worked,employee id,job group
14/11/2016,7.5,1,A
9/11/2016,4,2,B
report id,2,,`);

        const entries = await service.load();

        expect(entries).toEqual([
            { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
            { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
        ]);
    });

    it('should import a time report only once', async () => {
        const entry = { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' };
        await service.import({ entries: [entry], id: 3 });

        let err: Error;
        try {
            await service.import({ entries: [entry], id: 3 });
        } catch (error) {
            err = error;
        }
        expect(err).toEqual(new DuplicateReportError(3));

        const entries = await service.load();
        expect(entries).toEqual([entry]);
    });
});
