import { Database } from '../../data/database';
import { createDB } from '../../data/test-support';

import { TimeReportService } from './index';
import { Parser } from './parser';
import { Repository } from './repository';


describe('TimeReportService', () => {

    let db: Database;
    let service: TimeReportService;

    beforeEach(async () => {
        db = new Database('test_' + new Date().getTime());
        await createDB(db);

        const parser = new Parser();
        const repo = new Repository(db);
        service = new TimeReportService(parser, repo);
    });

    afterEach(async () => {
        // await deleteDB(db);
    });

    it('should import time report', async () => {
        await service.import({
            entries: [
                { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
                { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
            ],
            id: 42,
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
report id,43,,`);

        const entries = await service.load();
        expect(entries).toEqual([
            { date: new Date(2016, 10, 14), employeeId: 1, hoursWorked: 7.5, jobGroup: 'A' },
            { date: new Date(2016, 10, 9), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
        ]);
    });
});
