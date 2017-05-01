import { ITimeReportEntry } from '../track';

import { createPayrollReportService, PayrollReportService } from './index';


describe('PayrollReportService', () => {

    let service: PayrollReportService;
    let timeReportEntries: ITimeReportEntry[] = [];

    beforeEach(async () => {
        const timeReportLoader = {
            load: async () => {
                return timeReportEntries;
            },
        };
        service = createPayrollReportService(timeReportLoader);
    });

    it('should generate pay report', async () => {
        timeReportEntries = [
            { date: new Date(2016, 10, 10), employeeId: 2, hoursWorked: 4, jobGroup: 'B' },
        ];

        const report = await service.generateReport();

        expect(report).toEqual({
            entries: [
                { amount: 120, employeeId: 2,
                  payPeriod: { begin: new Date(2016, 10, 1), end: new Date(2016, 10, 15) }},
            ],
        });
    });
});
